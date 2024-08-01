const ClockNumbers: React.FC = () => {
  return (
    <>
      {[...Array(12)].map(
        (_, index): JSX.Element => (
          <div key={index} className="number" style={{ transform: `rotate(${index * 30}deg)` }}>
            <div style={{ transform: `rotate(${-index * 30}deg)` }}>{index === 0 ? 12 : index}</div>
          </div>
        )
      )}
    </>
  );
};
export default ClockNumbers;
