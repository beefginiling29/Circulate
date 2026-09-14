const diameter = document.getElementById("diameter");
const condition = document.getElementById("condition");

if (diameter && condition) {
  const pressure = document.getElementById("pressure");
  const meterFill = document.getElementById("meterFill");
  const diameterValue = document.getElementById("diameterValue");
  const vessel = document.getElementById("vessel");
  const conditionBadge = document.getElementById("conditionBadge");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");
  const pressureText = document.getElementById("pressureText");
  const observation = document.getElementById("observation");

  function updateExperiment() {
    const d = Number(diameter.value);
    const selected = condition.value;

    let base = 120;
    if (selected === "high") base = 145;
    if (selected === "low") base = 90;

    const simulated = Math.round(base + (70 - d) * 0.65);
    const clamped = Math.max(60, Math.min(180, simulated));

    diameterValue.textContent = d + "%";
    pressure.textContent = clamped;
    meterFill.style.width = ((clamped - 60) / 120 * 100) + "%";
    vessel.style.setProperty("--vessel-height", (12 + d * 0.42) + "px");
    conditionBadge.textContent = selected.toUpperCase();

    if (d < 45) {
      resultTitle.textContent = "Narrow vessel";
      resultText.textContent = "The opening is reduced. In this simulation, pressure rises as the vessel becomes narrower.";
      observation.textContent = "You narrowed the vessel, and the simulated pressure increased. This demonstrates the model's intended relationship between vessel diameter and pressure.";
      pressureText.textContent = "Higher simulated pressure";
    } else if (d > 80) {
      resultTitle.textContent = "Wide vessel";
      resultText.textContent = "The opening is wider. The simulated pressure is lower than with a strongly narrowed vessel.";
      observation.textContent = "You widened the vessel, and the simulated pressure decreased.";
      pressureText.textContent = "Lower simulated pressure";
    } else {
      resultTitle.textContent = "Moderate vessel";
      resultText.textContent = "The vessel is at a moderate diameter and the simulated pressure is near the selected baseline.";
      observation.textContent = "Try narrowing the vessel gradually and compare the pressure indicator.";
      pressureText.textContent = "Moderate simulated pressure";
    }

    localStorage.setItem("circulateCondition", selected);
    localStorage.setItem("circulateDiameter", d);
  }

  diameter.addEventListener("input", updateExperiment);
  condition.addEventListener("change", updateExperiment);

  const savedCondition = localStorage.getItem("circulateCondition");
  const savedDiameter = localStorage.getItem("circulateDiameter");
  if (savedCondition) condition.value = savedCondition;
  if (savedDiameter) diameter.value = savedDiameter;

  document.getElementById("reset").addEventListener("click", () => {
    diameter.value = 70;
    condition.value = "normal";
    updateExperiment();
  });

  updateExperiment();
}
