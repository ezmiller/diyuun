#!/bin/bash

SESSION="diyuun"

tmux has-session -t $SESSION 2>/dev/null

if [ "$?" -eq 1 ] ; then
  tmux -2 new-session -d -s $SESSION

  tmux set-option -t $SESSION mouse-select-pane on
  tmux set-option -t $SESSION mouse-select-window on
  tmux set-window-option -t $SESSION mode-mouse on

  tmux new-window -t $SESSION:1 -n
  tmux split-window -v
  tmux select-pane -t 1
  tmux send-keys "npm install --all && sails lift"  C-m
  tmux select-pane -t 0
fi
tmux -2 attach-session -t $SESSION
