import type { Cart, Customer } from '@medusa-starter/medusa-utils/models'
import { transformRegionCountriesToOptions } from '@medusa-starter/medusa-utils/region'
import { CheckboxForm } from '@medusa-starter/ui/components/form/checkbox-form'
import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SelectForm } from '@medusa-starter/ui/components/form/select-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { useUpdateCart } from '~web/features/cart/hooks/useUpdateCart'
import { getAddressFormOptions } from '../utils'

type AddressFormProps = {
  onSuccess: VoidFunction
  cart: Cart
  customer?: Customer
  selectedCountry: string | undefined
}

export const AddressForm: React.FC<AddressFormProps> = ({
  onSuccess,
  cart,
  customer,
  selectedCountry
}) => {
  const updateCartMutation = useUpdateCart(cart.id, onSuccess)
  const form = useForm({
    onSubmit: ({ value }) => {
      const shippingAddressData = {
        phone: value.phone,
        address_1: value.address1,
        address_2: value.address2 ? value.address2 : undefined,
        city: value.city,
        company: value.company ? value.company : undefined,
        first_name: value.firstName,
        last_name: value.lastName,
        postal_code: value.postalCode,
        province: value.province,
        country_code: value.countryCode
      }

      updateCartMutation.mutate({
        body: {
          email: value.email,
          shipping_address: shippingAddressData,
          billing_address: value.billingSameAddress
            ? shippingAddressData
            : {
                phone: value.billingPhone,
                address_1: value.billingAddress1,
                address_2: value.billingAddress2
                  ? value.billingAddress2
                  : undefined,
                city: value.billingCity,
                company: value.billingCompany
                  ? value.billingCompany
                  : undefined,
                first_name: value.billingFirstName,
                last_name: value.billingLastName,
                postal_code: value.billingPostalCode,
                province: value.billingProvince,
                country_code: value.billingCountryCode
              }
        }
      })
    },
    ...getAddressFormOptions(cart, customer, selectedCountry)
  })

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      {/* Shipping Address */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 @max-lg:flex-col">
          <div className="flex flex-2 flex-wrap gap-4 @max-sm:flex-col">
            <form.Field name="firstName">
              {field => (
                <InputForm
                  fieldName={field.name}
                  label="First name"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="John"
                  disabled={updateCartMutation.isPending}
                  errorMessage={field.state.meta.errors?.[0]?.message}
                />
              )}
            </form.Field>

            <form.Field name="lastName">
              {field => (
                <InputForm
                  fieldName={field.name}
                  label="Last name"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Doe"
                  disabled={updateCartMutation.isPending}
                  errorMessage={field.state.meta.errors?.[0]?.message}
                />
              )}
            </form.Field>
          </div>

          <form.Field name="company">
            {field => (
              <InputForm
                fieldName={field.name}
                label="Company name"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Company Ltd."
                disabled={updateCartMutation.isPending}
                errorMessage={field.state.meta.errors?.[0]?.message}
              />
            )}
          </form.Field>
        </div>

        <div className="flex flex-wrap gap-4 @max-lg:flex-col">
          <form.Field name="address1">
            {field => (
              <InputForm
                fieldName={field.name}
                label="Address line 1"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="123 Main St"
                disabled={updateCartMutation.isPending}
                errorMessage={field.state.meta.errors?.[0]?.message}
              />
            )}
          </form.Field>

          <form.Field name="address2">
            {field => (
              <InputForm
                fieldName={field.name}
                label="Address line 2"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Apt 4B"
                disabled={updateCartMutation.isPending}
                errorMessage={field.state.meta.errors?.[0]?.message}
              />
            )}
          </form.Field>
        </div>

        <div className="flex flex-wrap gap-4 @max-lg:flex-col">
          <form.Field name="postalCode">
            {field => (
              <InputForm
                fieldName={field.name}
                label="Postal code"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="10001"
                disabled={updateCartMutation.isPending}
                errorMessage={field.state.meta.errors?.[0]?.message}
              />
            )}
          </form.Field>

          <form.Field name="city">
            {field => (
              <InputForm
                fieldName={field.name}
                label="City"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="New York"
                disabled={updateCartMutation.isPending}
                errorMessage={field.state.meta.errors?.[0]?.message}
              />
            )}
          </form.Field>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 @max-lg:flex-col">
        <form.Field name="countryCode">
          {field => (
            <SelectForm
              fieldName={field.name}
              label="Country"
              placeholder="Select a country"
              value={field.state.value}
              onChange={value => field.handleChange(value)}
              options={
                cart.region
                  ? transformRegionCountriesToOptions(cart.region)
                  : []
              }
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="province">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Province/State"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="NY"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      {/* Billing Address */}
      <form.Field name="billingSameAddress">
        {field => (
          <CheckboxForm
            fieldName={field.name}
            label="Billing address same as shipping address"
            checked={field.state.value}
            onCheckedChange={checked =>
              typeof checked === 'boolean' && field.handleChange(checked)
            }
            onBlur={field.handleBlur}
            disabled={updateCartMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      {/* Email and phone number */}
      <div className="flex flex-wrap gap-4 @max-lg:flex-col">
        <form.Field name="email">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Email"
              type="email"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="john@example.com"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
        <form.Field name="phone">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Phone number"
              type="tel"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="+1 234 567 890"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      {/* Billing Address */}
      <form.Subscribe selector={state => state.values.billingSameAddress}>
        {billingSameAddress =>
          billingSameAddress ? null : (
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-semibold">Billing Address</h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 @max-lg:flex-col">
                  <div className="flex flex-2 flex-wrap gap-4 @max-sm:flex-col">
                    <form.Field name="billingFirstName">
                      {field => (
                        <InputForm
                          fieldName={field.name}
                          label="First name"
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="John"
                          disabled={updateCartMutation.isPending}
                          errorMessage={field.state.meta.errors?.[0]?.message}
                        />
                      )}
                    </form.Field>

                    <form.Field name="billingLastName">
                      {field => (
                        <InputForm
                          fieldName={field.name}
                          label="Last name"
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Doe"
                          disabled={updateCartMutation.isPending}
                          errorMessage={field.state.meta.errors?.[0]?.message}
                        />
                      )}
                    </form.Field>
                  </div>

                  <form.Field name="billingCompany">
                    {field => (
                      <InputForm
                        fieldName={field.name}
                        label="Company name"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Company Ltd."
                        disabled={updateCartMutation.isPending}
                        errorMessage={field.state.meta.errors?.[0]?.message}
                      />
                    )}
                  </form.Field>
                </div>

                <div className="flex flex-wrap gap-4 @max-lg:flex-col">
                  <form.Field name="billingAddress1">
                    {field => (
                      <InputForm
                        fieldName={field.name}
                        label="Address line 1"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="123 Main St"
                        disabled={updateCartMutation.isPending}
                        errorMessage={field.state.meta.errors?.[0]?.message}
                      />
                    )}
                  </form.Field>

                  <form.Field name="billingAddress2">
                    {field => (
                      <InputForm
                        fieldName={field.name}
                        label="Address line 2"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Apt 4B"
                        disabled={updateCartMutation.isPending}
                        errorMessage={field.state.meta.errors?.[0]?.message}
                      />
                    )}
                  </form.Field>
                </div>

                <div className="flex flex-wrap gap-4 @max-lg:flex-col">
                  <div className="flex flex-2 flex-wrap gap-4 @max-sm:flex-col">
                    <form.Field name="billingPostalCode">
                      {field => (
                        <InputForm
                          fieldName={field.name}
                          label="Postal code"
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="10001"
                          disabled={updateCartMutation.isPending}
                          errorMessage={field.state.meta.errors?.[0]?.message}
                        />
                      )}
                    </form.Field>

                    <form.Field name="billingCity">
                      {field => (
                        <InputForm
                          fieldName={field.name}
                          label="City"
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="New York"
                          disabled={updateCartMutation.isPending}
                          errorMessage={field.state.meta.errors?.[0]?.message}
                        />
                      )}
                    </form.Field>
                  </div>

                  <form.Field name="billingProvince">
                    {field => (
                      <InputForm
                        fieldName={field.name}
                        label="Province/State"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="NY"
                        disabled={updateCartMutation.isPending}
                        errorMessage={field.state.meta.errors?.[0]?.message}
                      />
                    )}
                  </form.Field>
                </div>

                <div className="flex flex-wrap gap-4 @max-lg:flex-col">
                  <form.Field name="billingPhone">
                    {field => (
                      <InputForm
                        fieldName={field.name}
                        label="Phone number"
                        type="tel"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="+1 234 567 890"
                        disabled={updateCartMutation.isPending}
                        errorMessage={field.state.meta.errors?.[0]?.message}
                      />
                    )}
                  </form.Field>
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          )
        }
      </form.Subscribe>

      <SubmitButton
        isPending={updateCartMutation.isPending}
        text="Continue to delivery"
      />
    </form>
  )
}
