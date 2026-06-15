import { useDispatch } from 'react-redux';
import { fetchShopInfoThunk } from '../../../store/slices/shopSlice';

const ErrorMessage = ({ publicToken, message }) => {
  const dispatch = useDispatch();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f0f4ff',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Could not load shop info
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 24, maxWidth: 360 }}>
        {message || 'Something went wrong. Please try again.'}
      </p>
      {publicToken && (
        <button
          onClick={() => dispatch(fetchShopInfoThunk(publicToken))}
          style={{
            background: '#1a56db',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
