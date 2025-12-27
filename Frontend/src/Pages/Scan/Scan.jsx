import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../supabase';
import { CheckCircle, XCircle, Camera, RefreshCw } from 'lucide-react';

const Scan = () => {
  const [data, setData] = useState('No result');
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [message, setMessage] = useState('');
  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setData(decodedText);
          setScanning(false);
          validateTicket(decodedText);
          scanner.clear();
          scannerRef.current = null;
        },
        (error) => {
          // Silent error handling - QR not detected yet
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  const validateTicket = async (qrString) => {
    setStatus('loading');
    try {
      // Format: userId-eventId-timestamp
      const [userId, eventId] = qrString.split('-');
      
      const { data: registration, error } = await supabase
        .from('registrations')
        .select('*, events(title)')
        .eq('qr_code_string', qrString)
        .single();

      if (error || !registration) {
        setStatus('error');
        setMessage('Invalid Ticket or Registration not found.');
        return;
      }

      // Here you could also check if the current user (coordinator) 
      // is authorized for this specific eventId
      
      setStatus('success');
      setMessage(`Valid Ticket for ${registration.events.title}`);
    } catch (err) {
      setStatus('error');
      setMessage('Error validating ticket.');
    }
  };

  const resetScanner = () => {
    setScanning(true);
    setStatus('idle');
    setData('No result');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Camera className="text-blue-500" /> Coordinator Scanner
      </h1>

      <div className="w-full max-w-md bg-black rounded-2xl overflow-hidden border-4 border-gray-800 relative">
        {scanning ? (
          <div id="qr-reader" className="w-full"></div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            {status === 'success' && (
              <>
                <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-500">Access Granted</h2>
                <p className="mt-2 text-gray-300">{message}</p>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="w-20 h-20 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="mt-2 text-gray-300">{message}</p>
              </>
            )}
            <button 
              onClick={resetScanner}
              className="mt-8 px-6 py-2 bg-blue-600 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700"
            >
              <RefreshCw className="w-5 h-5" /> Scan Next
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-gray-400 text-sm">
        Point the camera at the student's QR code
      </div>
    </div>
  );
};

export default Scan;
