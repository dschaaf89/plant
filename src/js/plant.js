// This function stores our state.
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

// We create four functions using our function factory. We could easily create many more.

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);


 

const storePlant = () => {
  let currentState = 0;
  return (inc) => {
    currentState += inc;
    return currentState;
  };
};
const plantIndex = storePlant();




$(document).ready(function () {
  let plantArray = [stateControl];
  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  $('.Feed').click(function () {
    const index = $(this).attr('id').split('_')[1];
    const newState = plantArray[index](feed);
     
    $('#Soil-Value_' + index).text(`Soil: ${newState.soil}`);
  });
  $('.BlueFood').click(function () {
    const index = $(this).attr('id').split('_')[1];
    const newState = plantArray[index](blueFood);
    $('#Soil-Value_' + index).text(`Soil: ${newState.soil}`);
  });
  $('.Hydrate').click(function () {
    const index = $(this).attr('id').split('_')[1];
    const newState = plantArray[index](hydrate);
    $('#Water-Value_' + index).text(`water: ${newState.water}`);
  });
  $('.SuperWater').click(function () {
    const index = $(this).attr('id').split('_')[1];
    const newState = plantArray[index](superWater);
    $('#Water-Value_' + index).text(`water: ${newState.water}`);
  });

  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function () {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
    $('#water-value').text(`water: ${currentState.water}`);
  });


  $('#newPlant').click(function () {
    const index = plantIndex(1);
    const html = '<div id=plant' + index + '> <button class="btn-success Feed" id="feed_' + index + '">Add soil</button><button class="btn-success BlueFood" id="BlueFood_' + index + '">Add BlueFood</button><button class="btn-success Hydrate" id="Hydrate_' + index + '">Hydrate</button><button class="btn-success SuperWater" id="SuperWater_' + index + '">SuperWater</button><button class="btn-success Show-State" id="show-state_' + index + '">Current Stats</button></div><h1>Your Plant\'s Values</h1><h3><div id="Soil-Value_' + index + '">0</div></h3><h3><div id="Water-Value_' + index + '">0</div></h3>';
    plantArray.push(storeState());
    $('.container').append(html);
    $('#feed_' + index).click(function () {
      const index = $(this).attr('id').split('_')[1];
      const newState = plantArray[index](feed);
       
      $('#Soil-Value_' + index).text(`Soil: ${newState.soil}`);
    });
    $('#BlueFood_' + index).click(function () {
      const index = $(this).attr('id').split('_')[1];
      const newState = plantArray[index](blueFood);
      $('#Soil-Value_' + index).text(`Soil: ${newState.soil}`);
    });
    $('#Hydrate_' + index).click(function () {
      const index = $(this).attr('id').split('_')[1];
      const newState = plantArray[index](hydrate);
      $('#Water-Value_' + index).text(`water: ${newState.water}`);
    });
    $('#SuperWater_' + index).click(function () {
      const index = $(this).attr('id').split('_')[1];
      const newState = plantArray[index](superWater);
      $('#Water-Value_' + index).text(`water: ${newState.water}`);
    });
    

    
    // const newState = stateControl(superWater);
    // $('#water-value').text(`water: ${newState.water}`);
  });



});