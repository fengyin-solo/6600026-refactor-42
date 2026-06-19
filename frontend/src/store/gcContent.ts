import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GCContent } from '../types';
import { useSequenceStore } from './sequence';
import { calculateGCContent } from '../utils/alignment';

export const useGCContentStore = defineStore('gcContent', () => {
  const data = ref<GCContent[]>([]);
  const selectedSeqId = ref<string>('');
  const windowSize = ref(50);

  function analyze(seqId?: string, window?: number) {
    const sequenceStore = useSequenceStore();
    const id = seqId ?? selectedSeqId.value;
    const win = window ?? windowSize.value;
    const seq = sequenceStore.findById(id);

    if (!seq) return;

    selectedSeqId.value = id;
    windowSize.value = win;
    data.value = calculateGCContent(seq.data, win);
  }

  function clear() {
    data.value = [];
  }

  function setSelectedSeqId(id: string) {
    selectedSeqId.value = id;
  }

  function setWindowSize(size: number) {
    windowSize.value = size;
  }

  function resetSelection() {
    const sequenceStore = useSequenceStore();
    selectedSeqId.value = sequenceStore.sequences[0]?.id ?? '';
  }

  return {
    data,
    selectedSeqId,
    windowSize,
    analyze,
    clear,
    setSelectedSeqId,
    setWindowSize,
    resetSelection
  };
});
