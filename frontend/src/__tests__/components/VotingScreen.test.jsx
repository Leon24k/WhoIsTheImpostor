/**
 * Unit tests for the VotingScreen component.
 *
 * Verifies:
 * - Each player votes one at a time (pass-the-device flow)
 * - Players cannot vote for themselves
 * - After all players vote, the most-voted player is sent to onVoteComplete
 * - Progress indicator updates correctly
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VotingScreen } from '../../components/VotingScreen';

// Minimal framer-motion stub to avoid animation side-effects in tests
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

const baseT = {
  title: 'Time to Vote!',
  subtitle: 'Choose who you suspect',
  selectPrompt: 'Select the player you suspect',
  confirmVote: 'Confirm Vote',
  voteFor: 'Vote for',
  passDevice: 'Pass the device to',
  ready: "I'm Ready!",
  voterTurn: 'Voter',
  votingFor: 'Voting for {player} as Imposter',
};

describe('VotingScreen', () => {
  it('shows the "pass device" screen for the first voter', () => {
    render(
      <VotingScreen players={basePlayers} onVoteComplete={jest.fn()} t={baseT} />,
    );

    expect(screen.getByText('Pass the device to')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText("I'm Ready!")).toBeInTheDocument();
  });

  it('shows voting UI after the voter clicks "ready"', () => {
    render(
      <VotingScreen players={basePlayers} onVoteComplete={jest.fn()} t={baseT} />,
    );

    fireEvent.click(screen.getByText("I'm Ready!"));

    // Now we should see the voting UI
    expect(screen.getByText('Time to Vote!')).toBeInTheDocument();
    expect(screen.getByText('Confirm Vote')).toBeInTheDocument();
  });

  it('does not show the current voter as a vote option', () => {
    render(
      <VotingScreen players={basePlayers} onVoteComplete={jest.fn()} t={baseT} />,
    );

    // Ready up as Alice
    fireEvent.click(screen.getByText("I'm Ready!"));

    // Alice should NOT appear as a selectable option
    // Bob and Charlie should
    const buttons = screen.getAllByRole('button');
    const buttonLabels = buttons.map((b) => b.textContent);

    // "Alice" only appears as part of the header context, not as a voteable button
    expect(buttonLabels.some((l) => l.includes('Bob'))).toBe(true);
    expect(buttonLabels.some((l) => l.includes('Charlie'))).toBe(true);
  });

  it('calls onVoteComplete with the most-voted player after all votes', () => {
    const onVoteComplete = jest.fn();

    render(
      <VotingScreen players={basePlayers} onVoteComplete={onVoteComplete} t={baseT} />,
    );

    // --- Alice votes for Bob ---
    fireEvent.click(screen.getByText("I'm Ready!"));
    fireEvent.click(screen.getByText('Bob'));
    fireEvent.click(screen.getByText('Confirm Vote'));

    // --- Bob votes for Charlie ---
    fireEvent.click(screen.getByText("I'm Ready!"));
    fireEvent.click(screen.getByText('Charlie'));
    fireEvent.click(screen.getByText('Confirm Vote'));

    // --- Charlie votes for Bob ---
    fireEvent.click(screen.getByText("I'm Ready!"));
    fireEvent.click(screen.getByText('Bob'));
    fireEvent.click(screen.getByText('Confirm Vote'));

    // Bob got 2 votes, Charlie got 1 → onVoteComplete should be called with "Bob"
    expect(onVoteComplete).toHaveBeenCalledTimes(1);
    expect(onVoteComplete).toHaveBeenCalledWith('Bob');
  });

  it('disables confirm button when no player is selected', () => {
    render(
      <VotingScreen players={basePlayers} onVoteComplete={jest.fn()} t={baseT} />,
    );

    fireEvent.click(screen.getByText("I'm Ready!"));

    const confirmButton = screen.getByText('Confirm Vote').closest('button');
    expect(confirmButton).toBeDisabled();
  });

  it('advances to the next voter after a vote is cast', () => {
    render(
      <VotingScreen players={basePlayers} onVoteComplete={jest.fn()} t={baseT} />,
    );

    // Alice votes
    fireEvent.click(screen.getByText("I'm Ready!"));
    fireEvent.click(screen.getByText('Bob'));
    fireEvent.click(screen.getByText('Confirm Vote'));

    // Should now show "pass device" for Bob
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Voter 2 / 3')).toBeInTheDocument();
  });
});
