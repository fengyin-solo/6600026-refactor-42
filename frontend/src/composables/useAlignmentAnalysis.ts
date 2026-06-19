import { useAlignmentStore } from '../store/alignment';

export function useAlignmentAnalysis() {
  const alignmentStore = useAlignmentStore();

  function runAlignment() {
    if (!alignmentStore.selectedSeq1 || !alignmentStore.selectedSeq2) return;
    if (alignmentStore.selectedSeq1 === alignmentStore.selectedSeq2) {
      alert('请选择两个不同的序列');
      return;
    }
    alignmentStore.run();
  }

  return {
    alignmentStore,
    runAlignment
  };
}
