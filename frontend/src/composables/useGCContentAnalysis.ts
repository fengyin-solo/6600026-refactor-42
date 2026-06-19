import { useGCContentStore } from '../store/gcContent';

export function useGCContentAnalysis() {
  const gcContentStore = useGCContentStore();

  function analyzeGC() {
    if (!gcContentStore.selectedSeqId) return;
    gcContentStore.analyze();
  }

  return {
    gcContentStore,
    analyzeGC
  };
}
