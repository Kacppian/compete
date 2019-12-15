function generateChallengeDiv() {
  const button = document.createElement("button");
  button.innerHTML = "Challenge";
  button.className = "ui-btn ui-btn-normal primary-cta ui-btn-primary";

  const div = document.createElement("div");
  div.className = "ctas challenge-others";
  div.appendChild(button);
  return div;
}

function challengeDivExists() {
  const divs = document.getElementsByClassName("challenge-others");
  return divs.length > 0;
}

function injectInviteLinks() {
  const insertableContainers = document.getElementsByClassName("cta-container");
  for (let i = 0; i < insertableContainers.length; i += 1) {
    const node = generateChallengeDiv();
    insertableContainers[i].appendChild(node);
  }
}

function callWhenDOMChanged() {
  if (challengeDivExists()) return;

  injectInviteLinks();
}

function startObservation() {
  const sections = document.getElementsByClassName("list-container left-pane");
  if (sections.length < 1) return;

  callWhenDOMChanged();

  const watchedSection = sections[0];
  const config = { attributes: true, childList: true, subtree: true };
  let observer = new MutationObserver(callWhenDOMChanged);
  observer.observe(watchedSection, config);
}

chrome.runtime.onMessage.addListener(function(request) {
  if (request.action === "re-observe")
    setTimeout(() => startObservation(), 1500);
});

startObservation();
