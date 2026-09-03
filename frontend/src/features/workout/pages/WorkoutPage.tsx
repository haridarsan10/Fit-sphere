import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { ActiveWorkoutPlan } from "@/components/workout/ActiveWorkoutPlan";
import { NextWorkoutCard } from "@/components/workout/NextWorkoutCard";
import { WorkoutPlanCard } from "@/components/workout/WorkoutPlanCard";
import { TodayWorkoutCard } from "@/components/workout/TodayWorkoutCard";

export default function WorkoutPage(){
  return(
    <PageContainer>
      <PageHeader
        title="My workouts"
        description="View your assigned workout plans and daily workouts." />

       <div className="space-y-6">
        {/* Active Plan */}
        <SectionCard
          title="Active Workout Plan"
          description="Your currently assigned training plan"
        >
          <ActiveWorkoutPlan />
        </SectionCard>

        {/* Today's + Next */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard
            title="Today's Workout"
            description="Your workout for today"
          >
            <TodayWorkoutCard />
          </SectionCard>

          <SectionCard
            title="Next Workout"
            description="Your upcoming workout"
          >
            <NextWorkoutCard />
          </SectionCard>
        </div>

        {/* Plans */}
        <SectionCard
          title="My Workout Plans"
          description="Your assigned and completed workout plans"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <WorkoutPlanCard
              title="Strength & Muscle Building"
              description="Build strength and increase muscle mass"
              duration="8 Weeks"
              frequency="4 Days / Week"
              status="Active"
            />

            <WorkoutPlanCard
              title="Weight Loss Program"
              description="Improve conditioning and reduce body fat"
              duration="6 Weeks"
              frequency="5 Days / Week"
              status="Completed"
            />

            <WorkoutPlanCard
              title="Mobility & Flexibility"
              description="Improve mobility and movement quality"
              duration="4 Weeks"
              frequency="3 Days / Week"
              status="Completed"
            />
          </div>
        </SectionCard>
      </div>

    </PageContainer>
  )
}