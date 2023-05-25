#pragma once

#include "resource.h"
#include "framework.h"

#include <Psapi.h>

#include <iostream>
#include <string>
#include <unordered_map>


#define ID_LISTVIEW 100
#define RUN_BUTTON 101
#define WINDOW_WIDTH 460

void StartRecording();
void StopRecording();
void UpdateListView();
