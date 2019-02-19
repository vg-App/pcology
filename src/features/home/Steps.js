import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})

function getSteps() {
  return [
    'Βήμα 1 - Μπες στο PCology.gr',
    'Βήμα 2 - Ενημερώσου για όλα τα θέματα που σε ενδιαφέρουν',
    'Βήμα 3 - Γίνε φίλος με άτομα που έχετε κοινά ενδιαφέροντα',
    'Βήμα 4 - Πρόσθεσε το δικό σου άρθρο'
  ]
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set()
  }

  totalSteps = () => getSteps().length

  isStepOptional = step => step === 1

  handleSkip = () => {
    const { activeStep } = this.state

    this.setState(state => {
      const skipped = new Set(state.skipped.values())
      skipped.add(activeStep)
      return {
        activeStep: state.activeStep + 1,
        skipped
      }
    })
  }

  handleNext = () => {
    let activeStep

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps()
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i))
    } else {
      activeStep = this.state.activeStep + 1
    }
    this.setState({
      activeStep
    })
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step
    })
  }

  handleComplete = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = new Set(this.state.completed)
    completed.add(this.state.activeStep)
    this.setState({
      completed
    })

    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext()
    }
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
    })
  }

  skippedSteps() {
    return this.state.skipped.size
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step)
  }

  isStepComplete(step) {
    return this.state.completed.has(step)
  }

  completedSteps() {
    return this.state.completed.size
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps()
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1
  }

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {}
            const buttonProps = {}

            if (this.isStepSkipped(index)) {
              props.completed = false
            }
            return (
              <Step key={label} {...props}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            )
          })}
        </Stepper>
        {/*
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                Πλέον είσαι έτοιμος
              </Typography>
            </div>
          ) : (
            
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleComplete}
              >
                {this.completedSteps() === this.totalSteps() + 1
                  ? 'Πατα στο ξεκιναμε για να μπεις!'
                  : 'Ειμαι ετοιμος για το επομενο βημα'}
              </Button>
            </div>
          )}
        </div>
         */}
      </div>
    )
  }
}

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper)
