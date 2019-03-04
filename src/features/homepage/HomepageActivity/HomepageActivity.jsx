import React from 'react'
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react'
import HomepageActivityItem from './HomepageActivityItem'

const HomepageActivity = ({ activities, contextRef }) => {
  return (
    <Sticky context={contextRef} offset={100}>
      <Header attached="top" content="Πρόσφατη δραστηριότητα" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <HomepageActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  )
}

export default HomepageActivity
