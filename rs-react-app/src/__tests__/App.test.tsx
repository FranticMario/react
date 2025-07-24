import { describe, expect, it } from 'vitest';
import App from '../App';
import { render } from '@testing-library/react';

describe('<App />', () => {
  it('Render App', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
