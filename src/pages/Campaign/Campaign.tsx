import React, { FunctionComponent, JSX, useState } from 'react'
import Post from '../../components/Post/component'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign, TLocationGovernmentType } from '../../types'
import { updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { storeCampaign, TCampaignRequest, updateCampaign } from '../../services/CampaignService'
import { viewCampaign } from '../../services/CampaignService'
import { addCampaign } from '../../reducers/campaign/campaignsIndexSlice'
import { TFields } from '../../components/InfoBar'

const Campaign: FunctionComponent = (): JSX.Element => {

  const { campaignId } = useParams() as { campaignId: string } // router

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate()

  const isNew: boolean = campaignId === 'new'

  const readyDataForRequest = (data: any): TCampaignRequest => ({
    name: data.name,
    content: data.content,
    visibility: data.visibility.id
  })

  const handleSubmit = (data: any): Promise<TCampaign> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeCampaign(validated)
        .then(({ data }) => {
          dispatch(updateCampaignData(data.data))
          dispatch(addCampaign(data.data))
          navigate(`/campaigns/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateCampaign(campaignId, validated)
        .then(({ data }) => {
          dispatch(updateCampaignData(data.data))
          return data.data
        })
    }
  }

  const handleFetch = async () => {
    if (campaignId && !isNew && !campaign) {
      await viewCampaign(campaignId)
        .then(response => {
          dispatch(updateCampaignData(response.data.data))
        })
    }
    if (isNew) {
      handleReset()
    }

  }

  const fields: TFields[] = [
    {
      name: 'visibility',
      label: 'Visibiliy',
      type: 'select',
      options: [
        { id: 1, name: 'Public' },
        { id: 2, name: 'Private' },
      ]
    }
  ]

  const handleReset = () => {}

  return (
    <Post
      key={campaignId}
      initialValues={campaign}
      onSubmit={handleSubmit}
      onFetch={handleFetch}
      ready={true}
      fields={fields}
      resetData={handleReset}
    />
  )

}

export default Campaign
