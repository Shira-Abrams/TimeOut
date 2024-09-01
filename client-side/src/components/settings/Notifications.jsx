import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Select from '../../stories/Select/Select.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import { selectAuth } from '../../redux/auth/auth.selector.js';

import CONSTANTS from './constantSetting.js';
import './Notifications.scss';

const Notifications = ({ onUpdate }) => {
  const { user } = useSelector(selectAuth);
  const { EMAIL_FREQUENCY_ENUM, TITLES, LABELS } = CONSTANTS;
  const {
    sendNotificationTime: notificationTime = 10,
    soundVoice: initialSoundVoice = "alertSound.mp3",
    displayIncomeMessages: showIncomeMessages = false,
    displayBrowsingTimeLimit: showBrowsingTimeLimit = false,
    emailFrequency: initialEmailFrequency = EMAIL_FREQUENCY_ENUM.NEVER
  } = user.preference || {};

  const baseServerUrl = process.env.REACT_APP_SERVER_URL;

  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [ringtoneFile, setRingtoneFile] = useState(null);
  const [soundVoice, setSoundVoice] = useState(`${baseServerUrl}/uploads/${initialSoundVoice}`);
  const [sendNotificationTime, setSendNotificationTime] = useState(notificationTime);
  const [displayIncomeMessages, setDisplayIncomeMessages] = useState(showIncomeMessages);
  const [displayBrowsingTimeLimit, setDisplayBrowsingTimeLimit] = useState(showBrowsingTimeLimit);

  const [prevValues, setPrevValues] = useState({
    emailFrequency: initialEmailFrequency,
    ringtoneFileName: null,
    sendNotificationTime: notificationTime,
    displayIncomeMessages: showIncomeMessages,
    displayBrowsingTimeLimit: showBrowsingTimeLimit
  });

  const { t: translate } = useTranslation();

  const emailFrequencyOptions = Object.keys(EMAIL_FREQUENCY_ENUM).map(key => ({
    text: translate(key.toLowerCase()),
    value: EMAIL_FREQUENCY_ENUM[key]
  }));

  useEffect(() => {
    if (prevValues.emailFrequency !== emailFrequency) {
      onUpdate({ emailFrequency });
      setPrevValues(prev => ({ ...prev, emailFrequency }));
    }
  }, [emailFrequency, onUpdate, prevValues.emailFrequency]);

  useEffect(() => {
    if (prevValues.sendNotificationTime !== sendNotificationTime) {
      onUpdate({ sendNotificationTime });
      setPrevValues(prev => ({ ...prev, sendNotificationTime }));
    }
  }, [sendNotificationTime, onUpdate, prevValues.sendNotificationTime]);

  useEffect(() => {
    if (prevValues.displayIncomeMessages !== displayIncomeMessages) {
      onUpdate({ displayIncomeMessages });
      setPrevValues(prev => ({ ...prev, displayIncomeMessages }));
    }
  }, [displayIncomeMessages, onUpdate, prevValues.displayIncomeMessages]);

  useEffect(() => {
    if (prevValues.displayBrowsingTimeLimit !== displayBrowsingTimeLimit) {
      onUpdate({ displayBrowsingTimeLimit });
      setPrevValues(prev => ({ ...prev, displayBrowsingTimeLimit }));
    }
  }, [displayBrowsingTimeLimit, onUpdate, prevValues.displayBrowsingTimeLimit]);

  useEffect(() => {
    if (prevValues.ringtoneFileName === null && ringtoneFile) {
      onUpdate({ soundVoice: ringtoneFile });
      setPrevValues(prev => ({ ...prev, ringtoneFileName: ringtoneFile.name }));
    } else if (ringtoneFile && prevValues.ringtoneFileName !== ringtoneFile.name) {
      onUpdate({ soundVoice: ringtoneFile });
      setPrevValues(prev => ({ ...prev, ringtoneFileName: ringtoneFile.name }));
    }
  }, [ringtoneFile, onUpdate, prevValues.ringtoneFileName]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setRingtoneFile(file);
      setSoundVoice(URL.createObjectURL(file));
    } else {
      setRingtoneFile(null);
      setSoundVoice('');
    }
  };

  const handleChangeEmailFreq = (selectedFrequency) => {
    const isInvalidFrequency = !Object.keys(EMAIL_FREQUENCY_ENUM).includes(selectedFrequency.toUpperCase());
    if (isInvalidFrequency) {
      return;
    }
    setEmailFrequency(selectedFrequency);
  };

  return (
    <div className="notifications-container">
      <div className="display-checkboxs">
        <GenericInput
          label={translate(LABELS.DISPLAY_INCOME_MESSAGES)}
          type="checkbox"
          checked={displayIncomeMessages}
          onChange={setDisplayIncomeMessages}
        />
        <GenericInput
          label={translate(LABELS.DISPLAY_BROWSING_TIME_LIMIT)}
          type="checkbox"
          checked={displayBrowsingTimeLimit}
          onChange={setDisplayBrowsingTimeLimit}
        />
      </div>
      <div className="select-container">
        <Select
          className='select-email-frequency'
          options={emailFrequencyOptions}
          title={translate(TITLES.SELECT_EMAIL_FREQUENCY)}
          onChange={handleChangeEmailFreq}
          value={emailFrequency}
          size='medium'
          widthOfSelect='11rem'
        />
      </div>
      <div className="input-container">
        <GenericInput
          size='medium'
          width='11rem'
          label={translate(LABELS.CHANGE_NOTIFICATION_TIME)}
          onChange={setSendNotificationTime}
          value={sendNotificationTime}
          type='number'
          className='gInput'
          min={0} max={60}
        />
      </div>
      <div className="file-container">
        <GenericInput
          type='file'
          label={translate(LABELS.CHANGE_RINGTONE)}
          onChange={handleFileChange}
          size='medium'
          width='11rem'
          accept='audio/mp3'
        />
        <audio controls className="audio-player">
          <source src={soundVoice} />
        </audio>
      </div>
    </div>
  );
};
Notifications.propTypes = {
  onUpdate: PropTypes.func.isRequired
};
export default Notifications;
