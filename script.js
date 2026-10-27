const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('header nav a');

// Typing effect (skipped if typed.js did not load)
if (window.Typed) {
  new Typed('#element', {
    strings: ['Fire Protection Engineer', 'Site Engineer', 'Fire Alarm Specialist'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  });
} else {
  document.querySelector('#element').textContent = 'Fire Protection Engineer';
}

// Mobile menu
menuIcon.addEventListener('click', () => {
  const open = navbar.classList.toggle('open');
  menuIcon.setAttribute('aria-expanded', open);
});
navLinks.forEach(a => a.addEventListener('click', () => {
  navbar.classList.remove('open');
  menuIcon.setAttribute('aria-expanded', 'false');
}));

// Highlight the nav link of the section currently in view
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    if (top >= offset && top < offset + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector('header nav a[href="#' + sec.id + '"]');
      if (link) link.classList.add('active');
    }
  });
});

// Contact form: opens the visitor's email app with the message filled in
document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = f.get('subject') || 'Portfolio enquiry from ' + f.get('name');
  const body = f.get('message') + '\n\nFrom: ' + f.get('name') + ' (' + f.get('email') + ')' + (f.get('phone') ? '\nPhone: ' + f.get('phone') : '');
  window.location.href = 'mailto:mdhasnin1309@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  document.querySelector('#form-status').textContent = 'Your email app should open with the message ready to send.';
});

// ---- Fire system demo ----
(function () {
  var DEV = {
    d11: { key: "smoke", label: "D-11", room: "Office A", z: 1 },
    d12: { key: "smoke", label: "D-12", room: "Office B", z: 2 },
    d14: { key: "smoke", label: "D-14", room: "the open workspace", z: 4 },
    d13: { key: "gas" }, d15: { key: "gas" },
    mcp: { key: "mcp" },
    sp1: { key: "sprinkler", room: "Office A", z: 1 },
    sp2: { key: "sprinkler", room: "Office B", z: 2 },
    sp3: { key: "sprinkler", room: "the open workspace", z: 4 }
  };
  var DEFAULT = { smoke: "d12", mcp: "mcp", sprinkler: "sp1", gas: "d13" };

  function build(key, id) {
    var d = DEV[id] || {};
    if (key === "smoke") return [
      { t: "Detector " + d.label + " in " + d.room + " senses smoke.", on: ["#" + id] },
      { t: "The panel shows an alarm with the zone and device address.", on: ["#facp", "[data-led=fire]", "#z" + d.z], lcd: ["FIRE ALARM", "ZONE " + d.z + "  DET " + d.label] },
      { t: "Sounders operate throughout the building.", on: [".snd", "[data-led=snd]"] },
      { t: "Outputs from the cause-and-effect matrix follow, such as AHU shutdown and door release.", on: [] }
    ];
    if (key === "mcp") return [
      { t: "Someone breaks the glass on the manual call point at the exit stair.", on: ["#mcp"] },
      { t: "The panel shows an alarm for the call point.", on: ["#facp", "[data-led=fire]", "#z4"], lcd: ["FIRE ALARM", "ZONE 4  MCP-01"] },
      { t: "Sounders operate throughout the building.", on: [".snd", "[data-led=snd]"] },
      { t: "The alarm stays on until someone resets the panel on site.", on: [] }
    ];
    if (key === "sprinkler") return [
      { t: "Heat opens the sprinkler head in " + d.room + ".", on: ["#" + id] },
      { t: "Water flows and pressure in the pipe drops.", on: ["#pipe"] },
      { t: "The flow switch signals the panel.", on: ["#flow", "#facp", "[data-led=fire]", "#z" + d.z], lcd: ["FIRE ALARM", "SPRINKLER FLOW"] },
      { t: "Pressure falls below the pump setting, so the jockey pump starts first.", on: ["#jockey", "[data-led=pump]"] },
      { t: "If pressure keeps falling, the main fire pump starts.", on: ["#mainpump"] }
    ];
    return [
      { t: "A detector in the server room senses smoke.", on: ["#d13"] },
      { t: "A second detector confirms it, so the panel raises a fire alarm.", on: ["#d15", "#facp", "[data-led=fire]", "#z3"], lcd: ["FIRE ALARM", "ZONE 3  2 DET"] },
      { t: "A pre-discharge alarm sounds and a delay timer starts, so people can leave.", on: [".snd", "[data-led=snd]"], lcd: ["PRE-DISCHARGE", "LEAVE THE ROOM"] },
      { t: "The panel releases NOVEC gas into the room.", on: ["#novec", "#gas", "[data-led=gas]"], lcd: ["GAS RELEASED", "ZONE 3"] },
      { t: "The clean agent suppresses the fire without soaking the equipment.", on: [] }
    ];
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var buttons = document.querySelectorAll(".pick[data-scn]");
  var stepsEl = document.getElementById("steps");
  var lcd = document.getElementById("lcd");
  var panel = document.getElementById("panel");
  var l1 = document.getElementById("lcd1");
  var l2 = document.getElementById("lcd2");
  var timers = [];

  function clearAll() {
    timers.forEach(clearTimeout);
    timers = [];
    document.querySelectorAll("#demo .on").forEach(function (el) { el.classList.remove("on"); });
    lcd.classList.remove("alarm");
    panel.classList.remove("alarm");
    l1.textContent = "SYSTEM NORMAL";
    l2.textContent = "ALL ZONES OK";
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
  }

  function idle() {
    stepsEl.innerHTML = "";
    var li = document.createElement("li");
    li.className = "hint";
    li.textContent = "Nothing has triggered yet. Choose an event to see each step light up.";
    stepsEl.appendChild(li);
  }

  function activate(s, li) {
    li.classList.add("on");
    s.on.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { el.classList.add("on"); });
    });
    if (s.lcd) {
      l1.textContent = s.lcd[0];
      l2.textContent = s.lcd[1];
      lcd.classList.add("alarm");
      panel.classList.add("alarm");
    }
  }

  function run(key, id) {
    clearAll();
    id = id || DEFAULT[key];
    var steps = build(key, id);
    stepsEl.innerHTML = "";
    var items = steps.map(function (s) {
      var li = document.createElement("li");
      li.textContent = s.t;
      stepsEl.appendChild(li);
      return li;
    });
    buttons.forEach(function (b) { if (b.getAttribute("data-scn") === key) b.setAttribute("aria-pressed", "true"); });
    steps.forEach(function (s, i) {
      if (reduce) { activate(s, items[i]); }
      else { timers.push(setTimeout(function () { activate(s, items[i]); }, i * 850)); }
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { run(b.getAttribute("data-scn")); });
  });
  Object.keys(DEV).forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", function () { run(DEV[id].key, id); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); run(DEV[id].key, id); }
    });
  });
  document.getElementById("reset").addEventListener("click", function () { clearAll(); idle(); });
})();
