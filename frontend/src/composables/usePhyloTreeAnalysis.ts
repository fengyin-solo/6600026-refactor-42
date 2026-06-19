import { useSequenceStore } from '../store/sequence';
import { usePhyloTreeStore } from '../store/phyloTree';

export function usePhyloTreeAnalysis() {
  const sequenceStore = useSequenceStore();
  const phyloTreeStore = usePhyloTreeStore();

  async function buildTree() {
    if (sequenceStore.sequences.length < 2) {
      alert('至少需要2条序列');
      return;
    }
    await phyloTreeStore.build();
  }

  return {
    sequenceStore,
    phyloTreeStore,
    buildTree
  };
}
