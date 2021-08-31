import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

describe('App', () => {
  it('renders top heading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Github repos explorer/i)).toBeInTheDocument();
  });

  it('displays list of users afer click on search button', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const usersList = await screen.findAllByRole('button', { name: /test/ });
    expect(usersList).toHaveLength(2);
  });
})

