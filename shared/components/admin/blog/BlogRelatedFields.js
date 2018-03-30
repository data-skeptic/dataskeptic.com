import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {
  renderCheckbox,
  renderField,
  renderSelect
} from '../../../Forms/Components/Field'
import styled from 'styled-components'
import BlogSearchSelect from './BlogSearchSelect'
import ImageUploadField from '../../../Forms/Components/ImageUploadField'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const config = require('../../../../config/config.json')
const c = config[env]

export const CAREER_CAROUSEL = 'career-carousel'
export const INTERNAL_LINK = 'internal-link'
export const EXTERNAL_LINK = 'external-link'
export const HOME_PAGE_IMAGE = 'homepage-image'
export const BLOG_HEADER_IMAGE = 'blog-header-img'
export const MP3 = 'mp3'
export const PERSON = 'person'
export const BLANK = 'blank'

const validate = values => {
  let errors = {}

  return errors
}

const EMPTY_RELATED_ITEM = {
  created: true
}

const renderInternalLinkFields = (member, disabled) => (
  <div>
    <Field
      label="Related Blog"
      component={renderField}
      customComponent={BlogSearchSelect}
      name={`${member}.dest`}
      type="text"
      required
      disabled={disabled}
    />

    <Field
      label="Link Anchor Text"
      component={renderField}
      name={`${member}.title`}
      type="url"
      required
      disabled={disabled}
    />

    <Field
      label="Comment"
      component={renderField}
      name={`${member}.body`}
      textarea
      required
      disabled={disabled}
    />
  </div>
)

const renderExternalLinkFields = (member, disabled) => (
  <div>
    <Field
      label="Related page url"
      component={renderField}
      name={`${member}.dest`}
      type="url"
      required
      disabled={disabled}
    />

    <Field
      label="Link Anchor Text"
      component={renderField}
      name={`${member}.title`}
      type="url"
      required
      disabled={disabled}
    />

    <Field
      label="Comment"
      component={renderField}
      name={`${member}.body`}
      textarea
      required
      defaultValue={'https://'}
      disabled={disabled}
    />
  </div>
)

const renderHomePageImageFields = (member, disabled) => (
  <div>
    <Field
      label="Image url (400x400px)"
      component={renderField}
      name={`${member}.dest`}
      required
      customComponent={ImageUploadField}
      strictWidth={400}
      strictHeight={400}
      bucket={c['files']['site_bucket']}
      accept="image/jpeg, image/png"
      disabled={disabled}
    />

    <Field
      label="Alt text"
      component={renderField}
      name={`${member}.title`}
      type="text"
      required
      disabled={disabled}
    />
  </div>
)

const renderBlogHeaderImageFields = (member, disabled) => (
  <div>
    <Field
      label="Image url (800x150px)"
      component={renderField}
      name={`${member}.title`}
      required
      customComponent={ImageUploadField}
      strictWidth={800}
      strictHeight={150}
      bucket={c['files']['site_bucket']}
      accept="image/jpeg, image/png"
      disabled={disabled}
    />

    <Field
      label="Alt text"
      component={renderField}
      name={`${member}.title`}
      type="text"
      required
      disabled={disabled}
    />
  </div>
)

const renderMp3Fields = (member, disabled) => (
  <div>
    <Field
      label="Media URL"
      component={renderField}
      name={`${member}.dest`}
      type="url"
      required
      disabled={disabled}
    />

    <Field
      label="Title of recording"
      component={renderField}
      name={`${member}.title`}
      type="text"
      required
      disabled={disabled}
    />

    <Field
      label="Description"
      component={renderField}
      name={`${member}.body`}
      textarea
      required
      disabled={disabled}
    />
  </div>
)

const renderPersonFields = (member, disabled) => (
  <div>
    <Field
      label="IMG URL"
      component={renderField}
      name={`${member}.dest`}
      type="url"
      required
      disabled={disabled}
    />

    <Field
      label="Guest Name"
      component={renderField}
      name={`${member}.title`}
      type="text"
      required
      disabled={disabled}
    />

    <Field
      label="Guest Bio"
      component={renderField}
      name={`${member}.body`}
      textarea
      required
      disabled={disabled}
    />
  </div>
)

const renderBlankFields = (member, disabled) => <div />

const renderCareerCarouselFields = (member, disabled) => (
  <div>
    <Field
      label="Carousel Image (1000x563)"
      component={renderField}
      name={`${member}.dest`}
      required
      customComponent={ImageUploadField}
      strictWidth={1000}
      strictHeight={563}
      bucket={c['files']['site_bucket']}
      accept="image/jpeg, image/png"
      disabled={disabled}
    />
  </div>
)

const renderRelatedFields = ({ type, member, disabled }) => {
  let fieldsRenderer

  switch (type) {
    case CAREER_CAROUSEL:
      fieldsRenderer = renderCareerCarouselFields
      break

    case INTERNAL_LINK:
      fieldsRenderer = renderInternalLinkFields
      break

    case EXTERNAL_LINK:
      fieldsRenderer = renderExternalLinkFields
      break

    case HOME_PAGE_IMAGE:
      fieldsRenderer = renderHomePageImageFields
      break

    case BLOG_HEADER_IMAGE:
      fieldsRenderer = renderBlogHeaderImageFields
      break

    case MP3:
      fieldsRenderer = renderMp3Fields
      break

    case PERSON:
      fieldsRenderer = renderPersonFields
      break

    case BLANK:
      fieldsRenderer = renderBlankFields
      break

    default:
      fieldsRenderer = renderBlankFields
  }

  const fields = fieldsRenderer(member, disabled)

  return (
    <RelatedFields>
      <Field
        name={`${member}.type`}
        component={renderSelect}
        label={'Type'}
        options={[
          { label: 'Internal Link', value: INTERNAL_LINK },
          { label: 'External Link', value: EXTERNAL_LINK },
          { label: 'Homepage Image', value: HOME_PAGE_IMAGE },
          { label: 'Blog Header Image', value: BLOG_HEADER_IMAGE },
          { label: 'Audio', value: MP3 },
          { label: 'Person', value: PERSON },
          { label: 'Career Carousel', value: CAREER_CAROUSEL }
        ]}
        blankOption={true}
        disabled={disabled}
      />

      {fields}
    </RelatedFields>
  )
}

export const renderRelated = ({ fields, meta: { error, submitFailed } }) => (
  <RelatedEntries>
    {submitFailed && error && <span>{error}</span>}

    {fields.map((member, index) => (
      <RelatedEntry key={index}>
        <RelatedIndex removed={fields.get(index).remove}>
          <span>Related #{index + 1}</span>

          <Field
            label="remove"
            fieldWrapperClasses={'remove'}
            name={`${member}.remove`}
            type="checkbox"
            component={renderCheckbox}
          />
        </RelatedIndex>
        {renderRelatedFields({
          type: fields.get(index).type,
          member,
          disabled: fields.get(index).remove
        })}
      </RelatedEntry>
    ))}

    <RelatedAddButton
      type="button"
      onClick={() => fields.push(EMPTY_RELATED_ITEM)}
    >
      + Add Related
    </RelatedAddButton>
  </RelatedEntries>
)

const RelatedEntries = styled.div`
  margin: 20px 0px;
`

const RelatedEntry = styled.div`
  margin-bottom: 2em;
  border-top: 1px solid #e1e3e2;
  padding-top: 2em;
`

const RelatedIndex = styled.div`
  span {
    font-weight: bold;
    margin-right: 10px;
  }

  .remove {
    label,
    p {
      padding: 0px;
      margin: 0px;
    }
  }

  display: flex;
  align-items: center;

  ${props =>
    props.removed &&
    `
      text-decoration: line-through;
      overflow: hidden;
  `};
`

const ActionButton = styled.button`
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 5px;
`

const RelatedAddButton = ActionButton.extend`
  background: #f0d943;
  margin-top: 1em;
`

const RelatedFields = styled.div``
