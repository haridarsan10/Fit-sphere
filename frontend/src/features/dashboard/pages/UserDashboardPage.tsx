import PageContainer from "@/components/common/PageContainer"
import PageHeader from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { StatsCard1 } from "@/components/ui/stats-card1"
import { SectionCard } from "@/components/common/SectionCard"
import { WorkoutCard } from "@/components/dashboard/WorkoutCard"
import { TrainerCard } from "@/components/dashboard/TrainerCard"
import { ProgressCard } from "@/components/dashboard/ProgressCard"
import { DietCard } from "@/components/dashboard/DietCard"
import { WorkoutCalendar } from "@/components/dashboard/WorkoutCalendar"

export default function UserDashboardPage() {

  return (
    <PageContainer>
      <PageHeader
        title="User Dashboard"
        description="Overview of your fitness activity." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

        <StatsCard1></StatsCard1>
        <StatsCard1></StatsCard1>
        <StatsCard1></StatsCard1>
        <StatsCard1></StatsCard1>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <SectionCard
          title="Today's Workout"
          description="Complete your assigned exercises"
          action={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <WorkoutCard />
        </SectionCard>

        <SectionCard
          title="Your Trainer"
          description="Assigned trainer for you"
          action={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <TrainerCard/>
        </SectionCard>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <SectionCard
          title="Your Progress"
          description="Checkout the progress that you have made so far"
          action={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <ProgressCard></ProgressCard>
        </SectionCard>

        <SectionCard
          title="Today's Workout"
          description="Complete your assigned exercises"
          action={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <DietCard></DietCard>
        </SectionCard>

      </div>

      <div>
        <SectionCard
          title="Today's Workout"
          description="Complete your assigned exercises"
          action={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <WorkoutCalendar/>
        </SectionCard>
      </div>

    </PageContainer>
  )
}