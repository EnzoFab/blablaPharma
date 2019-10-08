export default () => ({
  /**
   *  [
   *    {
   *
   *    },
   *    ...
   *  ]
   */
  activeConversations: [],

  /**
   * In order to have unique conversation without using functions like lodash.uniqBy
   * and to access directly to a specific conversation knowing it's id
   * format :
   *  {
   *    id : {
   *      id: number,
   *      createdAt: Date,
   *      members: Array<members>,
   *      lastMessage: Object
   *    },
   *  ...
   *  }
   */
  conversations: {},
  messages: [],
  notificationActivated: true
});
