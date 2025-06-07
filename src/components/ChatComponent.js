import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Speech from 'speak-tts';

const { Search } = Input;
const DOMAIN = process.env.REACT_APP_DOMAIN;

const searchContainer = {
  display: 'flex',
  justifyContent: 'center',
};

const ChatComponent = (props) => {
  const { handleResp, isLoading, setIsLoading } = props;
  const [searchValue, setSearchValue] = useState('');
  const [isChatModeOn, setIsChatModeOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speech, setSpeech] = useState();

  // speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        voice: 'Google US English',
        splitSentences: false,
      })
      .then((data) => {
        // "data" object contains list of available voices and voice synthesis params
        console.log('Speech is ready, voices are available', data);
        setSpeech(speech);
      })
      .catch((err) => {
        console.error('An error occurred while initializing', err);
      });
  }, []); // Only renders once

  useEffect(() => {
    if (!listening && Boolean(transcript)) {
      (async () => {
        await onSearch(transcript);
      })(); // IIFE (since cannot use async/await in useEffect)
      // Don't have to manually stop recording
      setIsRecording(false);
    }
  }, [listening, transcript]);

  const talk = (what2say) => {
    speech
      .speak({
        text: what2say,
        // Defines how to handle new speech requests when previous hasn't finished yet
        queue: false,
        listeners: {
          onstart: () => {
            console.log('Start utterance');
          },
          onend: () => {
            console.log('End utterance');
          },
          onresume: () => {
            console.log('Resume utterance');
          },
          onboundary: (event) => {
            console.log(
              event.name +
                ' boundary reached after ' +
                event.elapsedTime +
                ' milliseconds.'
            );
          },
        },
      })
      .then(() => {
        // Executed after done reading, loops back to listening to user
        userStartConvo();
      });
  };

  const userStartConvo = () => {
    SpeechRecognition.startListening();
    setIsRecording(true);
    resetTranscript();
  };

  const chatModeClickHandler = () => {
    setIsChatModeOn(!isChatModeOn);
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

  const recordingClickHandler = () => {
    if (isRecording) {
      setIsRecording(false);
      SpeechRecognition.stopListening();
    } else {
      setIsRecording(true);
      SpeechRecognition.startListening();
    }
  };

  const onSearch = async (question) => {
    // clear search input
    setSearchValue('');
    setIsLoading(true);

    try {
      const response = await axios.get(`${DOMAIN}/chat`, {
        params: {
          question,
        },
      });
      handleResp(question, response.data);
      if (isChatModeOn) {
        talk(response.data);
      }
    } catch (err) {
      handleResp(question, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div style={searchContainer}>
      {!isChatModeOn && (
        <Search
          placeholder="input search text"
          enterButton="Ask"
          size="large"
          onSearch={onSearch}
          loading={isLoading}
          value={searchValue}
          onChange={handleChange}
        />
      )}

      <Button
        type="primary"
        size="large"
        danger={isChatModeOn}
        onClick={chatModeClickHandler}
        style={{ marginLeft: '5px' }}
      >
        Chat Mode : {isChatModeOn ? 'On' : 'Off'}
      </Button>

      {isChatModeOn && (
        <Button
          type="primary"
          size="large"
          icon={<AudioOutlined />}
          danger={isRecording}
          onClick={recordingClickHandler}
          style={{
            marginLeft: '5px',
          }}
        >
          {isRecording ? 'Recording...' : 'Click to record'}
        </Button>
      )}
    </div>
  );
};

export default ChatComponent;
