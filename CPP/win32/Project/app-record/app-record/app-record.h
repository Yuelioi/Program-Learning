#pragma once

#include "resource.h"
#include "framework.h"

#include <Psapi.h>

#include <iostream>
#include <string>
#include <unordered_map>


#define ID_LISTVIEW 100
#define WINDOW_WIDTH 460

void StartRecording();
void StopRecording();
void UpdateListView();
void UpdateListViewItem(int index, const std::chrono::steady_clock::duration& duration);
int FindListViewItem(const std::wstring& appName);
void InsertListViewItem(const std::wstring& appName, const std::chrono::steady_clock::duration& duration);

