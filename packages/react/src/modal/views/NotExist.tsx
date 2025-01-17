import {
  InstallWalletButton,
  LogoStatus,
  SimpleDisplayModalContent,
  SimpleModalHead,
  SimpleModalView,
} from '@cosmology-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { GoDesktopDownload } from 'react-icons/go';

export const NotExist = ({
  onClose,
  onReturn,
  onInstall,
  logo,
  name,
  buttonIcon,
}: {
  onClose: () => void;
  onReturn: () => void;
  onInstall?: () => void;
  logo?: string;
  name: string;
  buttonIcon?: IconType;
}) => {
  const modalHead = (
    <SimpleModalHead
      title={name}
      backButton={true}
      onClose={onClose}
      onBack={onReturn}
    />
  );

  const modalContent = (
    <SimpleDisplayModalContent
      status={LogoStatus.Error}
      logo={logo}
      contentHeader={`${name} Not Installed`}
      contentDesc={
        onInstall
          ? `If ${name.toLowerCase()} is installed on your device, please refresh this page or follow the browser instructions.`
          : `Download link not provided. Try searching it or consulting the developer team.`
      }
      bottomButton={
        <InstallWalletButton
          icon={(buttonIcon as IconType) || GoDesktopDownload}
          buttonText={`Install ${name}`}
          onClick={onInstall}
          disabled={Boolean(onInstall)}
        />
      }
    />
  );

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />;
};
