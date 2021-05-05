import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { TextField, Grid } from "@material-ui/core"
import { ADD_LOG } from "../../graphql/logsGql"
import { useMutation } from "@apollo/client"
import { Alert } from "@material-ui/lab"

export default function AddDialogue({ open, setOpen }) {
	const [number, setNumber] = useState("")
	const [log, setLog] = useState("")
	const [error, setError] = useState("")

	const handleClose = () => {
		setOpen(false)
	}

	const [addLogs, { loading }] = useMutation(ADD_LOG, {
		update(_, result) {
			setOpen(false)
		},
		onError(err) {
			setError(
				err.graphQLErrors[0].extensions.exception.stacktrace[0].split(":")[2]
			)

			setTimeout(() => {
				setError("")
			}, [3000])
		},
		variables: {
			number: number.toString(),
			log,
		},
	})

	const handleAdd = () => {
		addLogs()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle style={{ color: "blue" }}>Add a Log</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} style={{ display: !error ? "none" : undefined }}>
						<Alert severity="error">{error}</Alert>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							label="Number"
							fullWidth
							type="number"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={log}
							onChange={(e) => setLog(e.target.value)}
							label="Log"
							rows={4}
							multiline={true}
							fullWidth
						/>
					</Grid>
					<Grid item style={{ color: "grey" }}>
						{log.length}/160
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAdd} color="primary" autoFocus>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}
