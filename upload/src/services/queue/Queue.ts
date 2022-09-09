interface Queue {
  sendMessage(message: unknown): Promise<unknown>;
}

export default Queue;
