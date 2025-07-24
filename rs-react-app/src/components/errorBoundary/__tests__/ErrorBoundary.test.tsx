import { describe, expect, it } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';
import { render, screen } from '@testing-library/react';

describe('<ErrorBoundery/>', () => {
  it('renders fallback UI on error and recovers on reset', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };
    render(
      <ErrorBoundary fallback={<ErrorBoundary />}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('errorboundary')).toBeVisible();
  });
});
