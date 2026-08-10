import NxtLoader from "@/components/NxtLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md">
      <NxtLoader />
    </div>
  );
}
