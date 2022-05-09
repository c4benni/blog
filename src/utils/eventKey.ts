export default function eventKey(e: KeyboardEvent) {
  const spaceBar = /^space$/i.test(e.code);
  const enterKey = /^enter$/i.test(e.code);
  const esc = /^escape$/i.test(e.code);
  const tab = /^tab$/i.test(e.code);
  if (spaceBar) {
    return "spacebar";
  }
  if (enterKey) {
    return "enter";
  }
  if (esc) {
    return "esc";
  }
  if (tab) {
    return "tab";
  }

  return "";
}
