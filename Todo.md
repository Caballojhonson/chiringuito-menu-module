- Fix margin - finalPrice correlation on rounding (Recalculate margin before submitting item to db)

- Add % merma (Maybe not. Prompt user to use unprocessed weights)

- Add mean menu price comparison stats by general & category // future

- Add info icon for problematic sections:
        ==> Quantities: "Please add the quantity you would normally buy, merma included. Orders will be made in these quantities"
        ==> Add supplement: 




// - Fix prep time format not being added automatically (Force minutes 'm' before submitting if timeFormat key is missing)
// - Fix inability to add decimals in quant fields in quantityForm
// - Fix 0's appearing on empty numeric inputs
// - IF is an intermediary, calculate & display price per kilo, send to DB
// - Add final weight / volume to fix a price per Kg on processed intermediate items
//         (IF intermediate  ==>  Specify final weight and calculate cost / kg & pvp is Kilo)
// - Think about how to adress intermediate processed basic items... 
// - Add a % increment button that adds a percentage to totalCost for certain circumnstances:
//         - Negligible costs like salt & pepper
//         - Fried meals (Oil consumption)
//         - Intermediate single use consumables (sous-vide bags, nitrogen canisters...)
// - Add prep time OK 
// - Add a calculator to final screen DONE
// - Fix ability to add same product twice OK!
// - Fix quantities (Inputs) being lost after navigating back DONE
// - Fix Margin (state) lagging one step behind DONE
// - Add quantity validation (Stats crash with empty values)
