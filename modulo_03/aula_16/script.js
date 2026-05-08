const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");
const card = document.getElementById("pokemonCard");
const status = document.getElementById("status");
const errorText = document.getElementById("error")

button.addEventListener("click", buscarPokemon);

async function buscarPokemon() {
  const query = input.value.toLowerCase().trim();

  if (!query) return;

  status.classList.add("visible");
  card.classList.remove("visible");
  errorText.textContent = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const data = await response.json();

    mostrarPokemon(data);
    setTimeout(() => {
      card.classList.add("visible");
    }, 100);
    status.classList.remove("visible");

  } catch (error) {
    errorText.textContent = "Pokémon não encontrado ❌";
    status.classList.remove("visible");
  }
}

function mostrarPokemon(pokemon) {
  const name = pokemon.name.toUpperCase();
  const image = pokemon.sprites.front_default;

  const types = pokemon.types.map(t => t.type.name);
  const mainType = types[0];

  const stats = pokemon.stats.map(stat => {
    return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
  }).join("");

  const typesHTML = types.map(type => {
    return `<span class="type">${type}</span>`;
  }).join("");

  card.className = `card ${mainType}`; // cor baseada no tipo principal
  card.innerHTML = `
    <h2>${name}</h2>
    <img src="${image}" alt="${name}">
    <div class="types">${typesHTML}</div>
    <div class="stats">${stats}</div>
  `;

  card.classList.remove("hidden");
}