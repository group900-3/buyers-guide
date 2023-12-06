export const Progress = ({ v, max }: { v: number; max: number }) => {
  const p = Math.min(100, Math.round((v / max) * 100));
  return (
    <div className="bg-neutral-100 h-1 mt-2">
      <div className="bg-i-blue h-1 mt-2" style={{ width: p + "%" }} />
    </div>
  );
};
