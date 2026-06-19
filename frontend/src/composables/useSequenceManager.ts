import { ref } from 'vue';
import { useSequenceStore } from '../store/sequence';
import { useGCContentStore } from '../store/gcContent';

export function useSequenceManager() {
  const sequenceStore = useSequenceStore();
  const gcContentStore = useGCContentStore();

  const newSeqName = ref('');
  const newSeqData = ref('');

  function addSequence() {
    if (!newSeqName.value.trim() || !newSeqData.value.trim()) return;

    const id = 'custom-' + Date.now();
    sequenceStore.addSequence(id, newSeqName.value.trim(), newSeqData.value.trim());

    newSeqName.value = '';
    newSeqData.value = '';
  }

  function loadMockSequences() {
    sequenceStore.loadMockSequences();
    gcContentStore.selectedSeqId = sequenceStore.sequences[0]?.id ?? '';
  }

  return {
    newSeqName,
    newSeqData,
    addSequence,
    loadMockSequences
  };
}
