// // components/ProgressBar.js

// import React from 'react';

// const ProgressBar = ({ value }) => {
//   const progress = Math.min(value, 100);

//   const getColor = () => {
//     if (progress >= 75) return 'bg-neonGreen';
//     if (progress >= 50) return 'bg-neonBlue';
//     return 'bg-neonPink';
//   };

//   return (
//     <div className="w-full bg-glass rounded-full h-4 overflow-hidden">
//       <div
//         className={`h-full ${getColor()} rounded-full shadow-neon transition-all`}
//         style={{ width: `${progress}%` }}
//       ></div>
//     </div>
//   );
// };

// export default ProgressBar;
import React from 'react';
import { LinearProgress, Box } from '@mui/material';

const ProgressBar = ({ value }) => {
  return (
    <Box sx={{ marginTop: 1 }}>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
};

export default ProgressBar;
