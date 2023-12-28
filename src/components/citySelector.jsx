/* eslint-disable react/prop-types */
function CitySelector({ setCheckout }) {
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor="checkout_shipping_address_province"
          className="field__label"
        >
          Delivery Station
        </label>
        <select
          onChange={(e) =>
            setCheckout((prev) => ({
              ...prev,
              state: e.target.value,
            }))
          }
          required="required"
          size="1"
          name="state"
          id="checkout_shipping_address_province"
          className="border border-primary px-3 py-2 rounded w-full"
        >
          <option value="" hidden>
            --- Please Select ---
          </option>
          <option value="Abia">Abia</option>
          <option value="Abuja Federal Capital Territor">Abuja (FCT)</option>
          <option value="Adamawa">Adamawa</option>
          <option value="Akwa Ibom">Akwa Ibom</option>
          <option value="Anambra">Anambra</option>
          <option value="Bauchi">Bauchi</option>
          <option value="Bayelsa">Bayelsa</option>
          <option value="Benue">Benue</option>
          <option value="Borno">Borno</option>
          <option value="Cross River">Cross River</option>
          <option value="Delta">Delta</option>
          <option value="Ebonyi">Ebonyi</option>
          <option value="Edo">Edo</option>
          <option value="Ekiti">Ekiti</option>
          <option value="Enugu">Enugu</option>
          <option value="Gombe">Gombe</option>
          <option value="Imo">Imo</option>
          <option value="Jigawa">Jigawa</option>
          <option value="Kaduna">Kaduna</option>
          <option value="Kano">Kano</option>
          <option value="Katsina">Katsina</option>
          <option value="Kebbi">Kebbi</option>
          <option value="Kogi">Kogi</option>
          <option value="Kwara">Kwara</option>
          <option value="Lagos">Lagos</option>
          <option value="Nassarawa">Nassarawa</option>
          <option value="Niger">Niger</option>
          <option value="Ogun">Ogun</option>
          <option value="Ondo">Ondo</option>
          <option value="Osun">Osun</option>
          <option value="Oyo">Oyo</option>
          <option value="Plateau">Plateau</option>
          <option value="Rivers">Rivers</option>
          <option value="Sokoto">Sokoto</option>
          <option value="Taraba">Taraba</option>
          <option value="Yobe">Yobe</option>
          <option value="Zamfara">Zamfara</option>
        </select>
      </div>
    </>
  );
}

export default CitySelector;
