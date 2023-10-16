import React, {useRef, useState} from "react";
import styles from "./KeystoreConnect.module.scss";
import Button from "../../atoms/Button";
import {mainnet, useConnect} from "wagmi";
import {MockConnector} from "@wagmi/connectors/mock";
import {createWalletClient, http, publicActions} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import Wallet, {thirdparty} from "ethereumjs-wallet";
import {callisto} from "../../../constants/chains/clo";
import IconButton from "../../atoms/IconButton";
import Svg from "../../atoms/Svg";
import Collapse from "../../atoms/Collapse";
import Preloader from "../../atoms/Preloader";
import clsx from "clsx";

const fromMyEtherWalletV2 = json => {
  if (json.privKey.length !== 64) {
    throw new Error('Invalid private key length');
  }
  const privKey = new Buffer(json.privKey, 'hex');
  return new Wallet(privKey);
};

const getWalletFromPrivKeyFile = (jsonfile, password) => {
  if (jsonfile.encseed != null) return Wallet.fromEthSale(jsonfile, password);
  else if (jsonfile.Crypto != null || jsonfile.crypto != null)
    return Wallet.fromV3(jsonfile, password, true);
  else if (jsonfile.hash != null)
    return thirdparty.fromEtherWallet(jsonfile, password);
  else if (jsonfile.publisher == 'MyEtherWallet')
    return fromMyEtherWalletV2(jsonfile);
  throw new Error('Invalid Wallet file');
};

const unlockKeystore = async (file, password) => {
  const newFile = {};
  // Small hack because non strict wasn't working..
  Object.keys(file).forEach(key => {
    newFile[key.toLowerCase()] = file[key];
  });

  return getWalletFromPrivKeyFile(newFile, password);
};

export default function KeystoreConnect({handleClose}) {
  const fileInput = useRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = useState(null);
  const [keystore, setKeystore] = useState(null);
  const [isUnlockingKeystore, setIsUnlockingKeystore] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);

  const handleFileChange = (event) => {
    setError(null);
    setFileError(null);
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents: any = e.target.result;
          const parsedJson = JSON.parse(fileContents);
          setKeystore(parsedJson);
        } catch (e) {
          setFileError("Unsupported file format");
        }
      };
      reader.readAsText(file);

    } else {
      setKeystore(null);
    }
  };

  const {connect, connectors, isLoading, pendingConnector} = useConnect();

  const importKeystoreFileHandler = async () => {
    setIsUnlockingKeystore(true);
    console.log("unlocking...");
    try {
      const result = await unlockKeystore(keystore, password);
      console.log(result);
      const PK: any = result?.getPrivateKeyString && result?.getPrivateKeyString();
      console.log(PK);
      if (PK) {
        const account = privateKeyToAccount(PK);
        const walletClient = createWalletClient({
          account,
          chain: callisto,
          transport: http(),
        }).extend(publicActions);

        const connector = new MockConnector({
          options: {
            walletClient: walletClient,
          },
        });
        connect({chainId: 820, connector});
      }
      setIsUnlockingKeystore(false);
      handleClose();
    } catch (error) {
      console.log("importKeystoreFileHandler ~ error:", error);
      setIsUnlockingKeystore(false);
      setError("Error while unlocking keystore");
    }
  };

  return <div className={styles.dialog}>
    <div className={styles.dialogHeader}>
      <span>Import wallet with JSON file</span>
      <button onClick={handleClose}>
        <Svg iconName="close"/>
      </button>
    </div>

    <div className={styles.dialogContent}>
      <input
        type="file"
        onChange={handleFileChange}
        style={{display: "none"}}
        ref={fileInput}
      />
      <div className={styles.fileInput}>
        <div className={styles.buttonWrapper}>
          <Button variant="outlined" onClick={() => {
            if(fileInput.current && fileInput.current) {
              fileInput.current.click()
            }
          }}>
            Browse...
          </Button>
        </div>
        <p className={styles.selectedFile}>{selectedFile?.name ? `${selectedFile?.name}` :
          <span className={styles.placeholderText}>Select keystore file</span>}</p>
      </div>
      <div className={styles.helperText}>
        {fileError && fileError}
      </div>
      <Collapse open={Boolean(keystore) && !Boolean(fileError)}>
        <div className={styles.hiddenPart}>
          <div className={styles.keystoreInputLabel}>
            Key store password
          </div>
          <div className={styles.amountInputWrapper}>
            <input
              value={password}
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="Key store password"
              className={clsx(styles.amountInput, error && styles.error)}
            />
            <button className={styles.showPasswordButton}>
              {/*<Svg iconName="show-password"/>*/}
            </button>
          </div>
          <div className={styles.helperText}>
            {error && error}
          </div>
          <Button onClick={importKeystoreFileHandler}>
            {!isUnlockingKeystore ? "Unlock" : <Preloader size={30}/>}
          </Button>
        </div>
      </Collapse>
    </div>
  </div>;
}
