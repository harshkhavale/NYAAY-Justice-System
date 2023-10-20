import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    // JavaScript code to load the chatbot
    (function (d, t) {
      var v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: '652fafcc0267ec00078fd003' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
        });
      };
      v.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      v.type = 'text/javascript';
      s.parentNode.insertBefore(v, s);
    })(document, 'script');
  }, []);

  return (
    <div>
      {/* Add your HTML content here */}
    </div>
  );
};

export default ChatBot;
