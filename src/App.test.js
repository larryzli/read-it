/**
 * @jest-environment node
 */
import { filter, editName } from "./components/Navigation/FilterNavigation";
import {
  docked,
  open,
  filterPeriodTitle,
  filterPeriod
} from "./components/Frontpage/Frontpage";
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
it("test docked", () => expect(docked).toBeFalsy());
it("test open", () => expect(open).toBeFalsy());
it("test filterPeriodTitle", () => expect(filterPeriodTitle).toBeFalsy());
it("test filterPeriod", () => expect(filterPeriod).toBeFalsy());
it("test hidden", () => expect(hidden).toBeFalsy());
it("test showSortDrawer", () => expect(showSortDrawer).toBeFalsy());
it("test inbox", () => expect(inbox).toBeFalsy());
it("test query", () => expect(query).toBeFalsy());
it("test showProfileSubnav", () => expect(showProfileSubnav).toBeFalsy());
it("test showMessagesSubnav", () => expect(showMessagesSubnav).toBeFalsy());
