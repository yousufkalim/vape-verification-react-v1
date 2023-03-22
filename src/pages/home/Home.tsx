import React, { FC, FormEvent, useState } from 'react';
import api from '../../api/request';

/*    Assets    */
import HomeLogo from '../../assets/home/logo.svg';
import ValidBg from '../../assets/home/valid_bg.svg';
import ValidImg from '../../assets/home/valid.svg';
import InValidBg from '../../assets/home/invalid_bg.svg';
import InValidImage from '../../assets/home/invalid.svg';
import UsedBg from '../../assets/home/used_bg.svg';
import UsedImage from '../../assets/home/used.svg';
import './Home.css';
import { toast } from 'react-toastify';

interface IBody {
  codeId: string;
}
interface IResponse {
  message: string;
  status: string;
  success: boolean;
}

// const status = 'valid';
const Home: FC = () => {
  const [code, setCode] = useState<string>('');
  const [codeStatus, setCodeStatus] = useState<string>('');
  const [statusBg, setStatusBg] = useState<string>('');
  const [statusImage, setStatusImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (status === 'valid') {
  //     setCodeStatus('valid');
  //     setStatusBg(ValidBg);
  //     setStatusImage(ValidImg);
  //   } else if (status === 'used') {
  //     setCodeStatus('used');
  //     setStatusBg(UsedBg);
  //     setStatusImage(UsedImage);
  //   } else {
  //     setCodeStatus('invalid');
  //     setStatusBg(InValidBg);
  //     setStatusImage(InValidImage);
  //   }
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const body = {
      codeId: code,
    };
    if (code !== '') {
      setLoading(true);
      api<IBody, IResponse>('post', '/codes/validate', body)
        .then((res) => {
          if (res.status === 'valid') {
            setCodeStatus(res.message);
            setStatusBg(ValidBg);
            setStatusImage(ValidImg);
          }
          setCode('');
          setLoading(false);
        })
        .catch((err) => {
          const { status, message } = err.response.data;
          if (status === 'used') {
            setCodeStatus(message);
            setStatusBg(UsedBg);
            setStatusImage(UsedImage);
          }
          if (status === 'invalid') {
            setCodeStatus(message);
            setStatusBg(InValidBg);
            setStatusImage(InValidImage);
          }
          setCode('');
          setLoading(false);
        });
    } else {
      toast.error('ERRO');
    }
  };
  return (
    <div className="home">
      <div className="home_wrapper">
        <div className="home_logo">
          <img src={HomeLogo} alt="logo" />
          <div className="logo_title">rescurb</div>
        </div>
        <div className="home_content">
          <div className="home_content_top">
            <div className="home_left">
              <div className="heading_main">Verify your product</div>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="code_field"
              >
                <div className="field_label">Enter Your Code</div>
                <div>
                  <input
                    className="input_field"
                    placeholder="12232 4533 6554"
                    type="text"
                    value={code}
                    onChange={handleChange}
                  />
                </div>
                <button disabled={!code || loading} className="verify_btn">
                  {codeStatus ? 'Verify another code' : 'Verify'}
                </button>
              </form>
            </div>
            <div className="home_right">
              <div className="heading_main">How to verify your product</div>
              <div className="step_label">Step 1</div>
              <div className="step_description">
                Locate the authentication label on your product.
              </div>
              <div className="step_label">Step 2</div>
              <div className="step_description">Scratch off the coating to reveal the code.</div>
              <div className="step_label">Step 3</div>
              <div className="step_description">
                Enter the code in the input field on the left side of the page.
              </div>
              <div className="step_label">Step 4</div>
              <div className="step_description">
                Click the Verify button to get the authentication result.
              </div>
            </div>
          </div>
          {codeStatus && (
            <div className="home_content_bottom" style={{ backgroundImage: `url(${statusBg})` }}>
              <div className="home_status">
                <div className="home_status_content">
                  <div className="status">
                    <span>
                      <img src={statusImage} alt="status" />
                    </span>{' '}
                    {codeStatus}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="home_footer">
        © 2023 <span>@Brand_Name</span>, All Rights Reserved.
      </div>
    </div>
  );
};

export default Home;
