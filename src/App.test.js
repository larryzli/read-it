/**
 * @jest-environment node
 */
import { filter, editName } from "./components/Navigation/FilterNavigation";
import {
  title,
  url,
  selfText,
  sendReplies
} from "./components/SubmitPost/SubmitPost";
import {
  showControls,
  showReplyInput,
  replySubmitted,
  hidden
} from "./components/Comment/Comment";

import { showSortDrawer } from "./components/Profile/Profile";
import { inbox, query } from "./components/Navigation/InboxNavigation";
import { showProfileSubnav, showMessagesSubnav } from "./components/Menu/Menu";

it("test filter", () => expect(filter).toBeFalsy());
it("test editName", () => expect(editName).toBeFalsy());
it("test showReplyInput", () => expect(showReplyInput).toBeFalsy());
it("test replySubmitted", () => expect(replySubmitted).toBeFalsy());
it("test showControls", () => expect(showControls).toBeFalsy());

it("test title", () => expect(title).toBeFalsy());
it("test url", () => expect(url).toBeFalsy());
it("test selfText", () => expect(selfText).toBeFalsy());
it("test sendReplies", () => expect(sendReplies).toBeFalsy());

it("test hidden", () => expect(hidden).toBeFalsy());
it("test showSortDrawer", () => expect(showSortDrawer).toBeFalsy());
it("test inbox", () => expect(inbox).toBeFalsy());
it("test query", () => expect(query).toBeFalsy());
it("test showProfileSubnav", () => expect(showProfileSubnav).toBeFalsy());
it("test showMessagesSubnav", () => expect(showMessagesSubnav).toBeFalsy());
