import { useState, useCallback } from 'react';
import { WorldId, WorldLoreItem } from '../types/world';
import { addVisitedWorld } from '../utils/storage';

export function useWorldNavigation(initialVisited: string[] = ['hub']) {
  const [currentWorld, setCurrentWorld] = useState<WorldId>('hub');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [visitedWorlds, setVisitedWorlds] = useState<string[]>(initialVisited);
  const [activeLore, setActiveLore] = useState<WorldLoreItem | null>(null);

  const navigateToWorld = useCallback((worldId: WorldId, onBeforeTransition?: () => void) => {
    if (worldId === currentWorld || isTransitioning) return;

    if (onBeforeTransition) {
      onBeforeTransition();
    }

    setIsTransitioning(true);

    // Track visited worlds in storage
    const updated = addVisitedWorld(worldId);
    setVisitedWorlds(updated);

    // Close any open lore popup
    setActiveLore(null);

    // Sequence transition
    setTimeout(() => {
      setCurrentWorld(worldId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 600);
  }, [currentWorld, isTransitioning]);

  const returnToHub = useCallback((onBeforeTransition?: () => void) => {
    navigateToWorld('hub', onBeforeTransition);
  }, [navigateToWorld]);

  return {
    currentWorld,
    isTransitioning,
    visitedWorlds,
    activeLore,
    setActiveLore,
    navigateToWorld,
    returnToHub,
  };
}
