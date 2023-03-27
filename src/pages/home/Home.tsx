import React, { FC, FormEvent, useLayoutEffect, useState } from 'react';
import api from '../../api/request';

/*    Assets    */
// import HomeLogo from '../../assets/home/logo.svg';
import ValidBg from '../../assets/home/valid_bg.svg';
import ValidImg from '../../assets/home/valid.svg';
import InValidBg from '../../assets/home/invalid_bg.svg';
import InValidImage from '../../assets/home/invalid.svg';
import UsedBg from '../../assets/home/used_bg.svg';
import UsedImage from '../../assets/home/used.svg';
import Loading from '../../assets/loader.gif';
import './Home.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { mediaUrl } from '../../config';

interface IBody {
  codeId?: string;
  message?: string;
  status?: string;
  success?: boolean;
}
// interface IResponse {
//   message: string;
//   status: string;
//   success: boolean;
// }

interface IResponse {
  brand: IBrand;
}

interface IBrand {
  name: string;
  id: string;
  preferences: {
    color?: string;
    logo?: string;
  };
}

// const status = 'valid';
const Home: FC = () => {
  const [code, setCode] = useState<string>('');
  const [codeStatus, setCodeStatus] = useState<string>('');
  const [statusBg, setStatusBg] = useState<string>('');
  const [statusImage, setStatusImage] = useState<string>('');
  const [brand, setBrand] = useState<IBrand>({
    name: '',
    id: '',
    preferences: { color: '', logo: '' },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
  const params = useParams();

  useLayoutEffect(() => {
    const { brandName } = params;
    if (brandName) {
      setLoading(true);
      api<IResponse>('get', `/users/brand/${brandName}`)
        .then((res) => {
          setBrand(res.brand);
          setLoading(false);
        })
        .catch(() => {
          navigate('/');
          setLoading(false);
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const body = {
      codeId: code,
      brandId: brand.id,
    };
    if (code !== '') {
      setSubmitLoading(true);
      api<IBody>('post', '/codes/validate', body)
        .then((res) => {
          if (res.status === 'valid') {
            if (res?.message) {
              setCodeStatus(res.message);
            }
            setStatusBg(ValidBg);
            setStatusImage(ValidImg);
          }
          setCode('');
          setSubmitLoading(false);
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
          setSubmitLoading(false);
        });
    } else {
      toast.error('ERRO');
    }
  };

  const logo = brand?.preferences?.logo ? `${mediaUrl}/${brand.preferences?.logo}` : '';

  if (loading) {
    return (
      <div className="home_loading">
        <img src={Loading} alt="loading" />
      </div>
    );
  } else {
    return (
      <div
        className="home"
        style={{
          // background: `url(${logo})`,
          backgroundColor: brand?.preferences.color,
        }}
      >
        <div className="bg_logo">
          <img src={logo} />
        </div>

        <div className="home_wrapper">
          <div className="home_logo">
            {brand?.preferences?.logo && <img className="brand_logo" src={logo} />}
            {/* <div className="logo_title">{brand?.name}</div> */}
            {/* <img src={HomeLogo} alt="logo" /> */}
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
                  <button disabled={!code || submitLoading} className="verify_btn">
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
          © 2023 <span>@Falcon Consulting</span>, All Rights Reserved.
        </div>
      </div>
    );
  }
};

export default Home;
