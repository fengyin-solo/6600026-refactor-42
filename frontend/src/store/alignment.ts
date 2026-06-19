import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AlignmentResult } from '../types';
import { useSequenceStore } from './sequence';
import { needlemanWunsch, smithWaterman } from '../utils/alignment';

export const useAlignmentStore = defineStore('alignment', () => {
  const result = ref<AlignmentResult | null>(null);
  const currentAlgorithm = ref<'nw' | 'sw'>('nw');
  const selectedSeq1 = ref<string>('');
  const selectedSeq2 = ref<string>('');

  const identity = computed(() => result.value?.identity ?? 0);
  const score = computed(() => result.value?.score ?? 0);

  function run(algorithm?: 'nw' | 'sw') {
    const sequenceStore = useSequenceStore();
    const s1 = sequenceStore.findById(selectedSeq1.value);
    const s2 = sequenceStore.findById(selectedSeq2.value);

    if (!s1 || !s2) return;

    const algo = algorithm ?? currentAlgorithm.value;
    currentAlgorithm.value = algo;

    result.value = algo === 'nw'
      ? needlemanWunsch(s1.data, s2.data)
      : smithWaterman(s1.data, s2.data);
  }

  function clear() {
    result.value = null;
  }

  function setAlgorithm(algorithm: 'nw' | 'sw') {
    currentAlgorithm.value = algorithm;
  }

  function setSelectedSeq1(id: string) {
    selectedSeq1.value = id;
  }

  function setSelectedSeq2(id: string) {
    selectedSeq2.value = id;
  }

  function resetSelection() {
    const sequenceStore = useSequenceStore();
    selectedSeq1.value = sequenceStore.sequences[0]?.id ?? '';
    selectedSeq2.value = sequenceStore.sequences[1]?.id ?? '';
  }

  return {
    result,
    currentAlgorithm,
    selectedSeq1,
    selectedSeq2,
    identity,
    score,
    run,
    clear,
    setAlgorithm,
    setSelectedSeq1,
    setSelectedSeq2,
    resetSelection
  };
});
