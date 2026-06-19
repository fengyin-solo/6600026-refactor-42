import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Sequence } from '../types';
import { MOCK_SEQUENCES } from '../utils/alignment';
import { useAlignmentStore } from './alignment';
import { useGCContentStore } from './gcContent';
import { usePhyloTreeStore } from './phyloTree';

export const useSequenceStore = defineStore('sequence', () => {
  const sequences = ref<Sequence[]>([]);

  function findById(id: string): Sequence | undefined {
    return sequences.value.find(s => s.id === id);
  }

  function addSequence(id: string, name: string, data: string) {
    sequences.value.push({
      id,
      name,
      data: data.toUpperCase().replace(/[^ACGT]/g, ''),
      length: data.length
    });
  }

  function removeSequence(id: string) {
    sequences.value = sequences.value.filter(s => s.id !== id);
    clearDependentResults();
  }

  function clearAll() {
    sequences.value = [];
    clearDependentResults();
  }

  function clearDependentResults() {
    const alignmentStore = useAlignmentStore();
    const gcContentStore = useGCContentStore();
    const phyloTreeStore = usePhyloTreeStore();

    alignmentStore.clear();
    gcContentStore.clear();
    phyloTreeStore.clear();
  }

  function loadMockSequences() {
    const alignmentStore = useAlignmentStore();
    const gcContentStore = useGCContentStore();
    const phyloTreeStore = usePhyloTreeStore();

    sequences.value = [];
    for (const mock of MOCK_SEQUENCES) {
      addSequence(mock.id, mock.name, mock.data);
    }

    alignmentStore.resetSelection();
    gcContentStore.resetSelection();
    phyloTreeStore.clear();
  }

  return {
    sequences,
    findById,
    addSequence,
    removeSequence,
    clearAll,
    loadMockSequences
  };
});
