/**
 * Unit tests for the ResultScreen component.
 *
 * Verifies:
 * - Correct win/loss display based on vote result
 * - Multi-imposter support
 * - Translation keys are used (no hardcoded text leaks)
 * - All players are listed
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultScreen } from '../../components/ResultScreen';

// Stub framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  const forwardMotion = (tag) =>
    React.forwardRef((props, ref) => {
      // eslint-disable-next-line no-unused-vars
      const { initial, animate, exit, transition, whileHover, whileTap, variants, ...rest } = props;
      return React.createElement(tag, { ...rest, ref });
    });

  return {
    __esModule: true,
    motion: new Proxy({}, { get: (_t, tag) => forwardMotion(tag) }),
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

const basePlayers = ['Alice', 'Bob', 'Charlie'];
const baseWordData = { word: 'Cat', category: 'Animals' };

const baseT = {
  innocentsWin: 'INNOCENTS WIN!',
  imposterWins: 'IMPOSTER WINS!',
  innocentsWinDesc: 'You found the imposter!',
  imposterWinsDesc: 'The imposter hid their identity!',
  theImposter: 'The imposter was',
  suspected: 'Suspected',
  actualWord: 'Actual Word',
  category: 'Category',
  playAgain: 'Play Again',
  backToSetup: 'Back to Home',
  noOneSelected: 'No one selected',
  allPlayers: 'All Players',
  funFactWin: 'Great teamwork!',
  funFactLose: 'The imposter was clever!',
};

describe('ResultScreen', () => {
  it('displays "INNOCENTS WIN!" when the suspected player is the imposter', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]} // Bob
        suspectedImposter="Bob"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    expect(screen.getByText('INNOCENTS WIN!')).toBeInTheDocument();
    expect(screen.getByText('You found the imposter!')).toBeInTheDocument();
  });

  it('displays "IMPOSTER WINS!" when the suspected player is wrong', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]} // Bob
        suspectedImposter="Alice"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    expect(screen.getByText('IMPOSTER WINS!')).toBeInTheDocument();
  });

  it('shows the actual word and category', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]}
        suspectedImposter="Bob"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    expect(screen.getByText('Cat')).toBeInTheDocument();
    expect(screen.getByText('Animals')).toBeInTheDocument();
  });

  it('lists all players', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]}
        suspectedImposter="Bob"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    expect(screen.getByText('All Players')).toBeInTheDocument();
    basePlayers.forEach((name) => {
      expect(screen.getByText(new RegExp(name))).toBeInTheDocument();
    });
  });

  it('uses the translated "noOneSelected" when no one was voted', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]}
        suspectedImposter={null}
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    expect(screen.getByText('No one selected')).toBeInTheDocument();
  });

  it('supports multi-imposter (array) indices', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[0, 2]} // Alice and Charlie
        suspectedImposter="Alice"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    // Alice is one of the imposters, so innocents win
    expect(screen.getByText('INNOCENTS WIN!')).toBeInTheDocument();
  });

  it('supports legacy single-number imposterIndex', () => {
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={1} // legacy: single number
        suspectedImposter="Bob"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    expect(screen.getByText('INNOCENTS WIN!')).toBeInTheDocument();
  });

  it('calls onPlayAgain when Play Again button is clicked', () => {
    const onPlayAgain = jest.fn();
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]}
        suspectedImposter="Bob"
        wordData={baseWordData}
        onPlayAgain={onPlayAgain}
        onBackToSetup={jest.fn()}
        t={baseT}
      />,
    );

    fireEvent.click(screen.getByText('Play Again'));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });

  it('calls onBackToSetup when Back to Home button is clicked', () => {
    const onBackToSetup = jest.fn();
    render(
      <ResultScreen
        players={basePlayers}
        imposterIndex={[1]}
        suspectedImposter="Bob"
        wordData={baseWordData}
        onPlayAgain={jest.fn()}
        onBackToSetup={onBackToSetup}
        t={baseT}
      />,
    );

    fireEvent.click(screen.getByText('Back to Home'));
    expect(onBackToSetup).toHaveBeenCalledTimes(1);
  });
});
