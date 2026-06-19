import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PhyloNode } from '../types';
import { useSequenceStore } from './sequence';
import { calculateDistanceMatrix, buildNJTree } from '../utils/alignment';

export const usePhyloTreeStore = defineStore('phyloTree', () => {
  const tree = ref<PhyloNode | null>(null);
  const isBuilding = ref(false);

  async function build(): Promise<void> {
    const sequenceStore = useSequenceStore();

    if (sequenceStore.sequences.length < 2) return;

    isBuilding.value = true;

    await new Promise(resolve => setTimeout(resolve, 100));

    const seqData = sequenceStore.sequences.map(s => ({ name: s.name, data: s.data }));
    const distMatrix = calculateDistanceMatrix(seqData);
    const names = sequenceStore.sequences.map(s => s.name);

    tree.value = buildNJTree(distMatrix, names);
    isBuilding.value = false;
  }

  function clear() {
    tree.value = null;
    isBuilding.value = false;
  }

  return {
    tree,
    isBuilding,
    build,
    clear
  };
});
