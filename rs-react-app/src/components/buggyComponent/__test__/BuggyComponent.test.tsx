import { render, screen } from '@testing-library/react';
import BuggyComponent from '../BuggyComponent';
import { describe, expect, it } from 'vitest';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

describe('BuggyComponent', () => {
  it('throws error and shows fallback UI from ErrorBoundary', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('errorboundary')).toBeInTheDocument();
    expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();
  });
  it('catches error and shows fallback UI', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /попробовать снова/i })
    ).toBeInTheDocument();
  });
});
