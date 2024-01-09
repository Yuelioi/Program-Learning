from enum import Enum
from typing import Any, Tuple, Callable, Optional

ThreeDColorValue = Tuple[float, float, float]


def Base():
    def _get_property(self, arg):
        return


class File:
    ...


class Folder:
    ...


class AppVersion(Enum):
    CS3 = 8.0
    CS4 = 9.0
    CS5 = 10.0
    CS5_5 = 10.5
    CS6 = 11.0
    CC = 12.0
    CC2014 = 13.0
    CC2015 = 13.5
    CC2015_1 = 13.6
    CC2015_2 = 13.7
    CC2015_3 = 13.8
    CC2017 = 14.0
    CC2018 = 15.0
    CC2019 = 16.0
    CC2020 = 17.0


class CommandID(Enum):
    # File

    NewProject = 2
    NewFolder = 2139
    NewAdobePhotoshopFile = 3147
    NewMAXONCINEMA4DFile = 4007
    OpenProject = 3
    OpenRecentProject1 = 2330
    OpenRecentProject2 = 2331
    OpenRecentProject3 = 2332
    OpenRecentProject4 = 2333
    OpenRecentProject5 = 2334
    BrowseInBridge = 3689

    Close = 4
    CloseProject = 3154
    Save = 5
    SaveAs = 6
    SaveACopy = 2166
    SaveACopyAsXML = 3785
    IncrementAndSave = 3088
    Revert = 7

    ImportFile = 2003
    ImportMultipleFiles = 2236
    ImportPlaceholder = 2126
    ImportSolid = 3000
    ImportRecentFootage1 = 2310
    ImportRecentFootage2 = 2311
    ImportRecentFootage3 = 2312
    ImportRecentFootage4 = 2313
    ImportRecentFootage5 = 2314
    ImportRecentFootage6 = 2315
    ImportRecentFootage7 = 2316
    ImportRecentFootage8 = 2317
    ImportRecentFootage9 = 2318
    ImportRecentFootage10 = 2319
    ExportAddToAdobeMediaEncoderQueue = 3800
    ExportAddToRenderQueue = 2161

    AddFootageToComp = 2005
    NewCompFromSelection = 2796

    CollectFiles = 2482
    ConsolidateAllFootage = 2107
    RemoveUnusedFootage = 2109
    ReduceProject = 2735
    FindMissingEffects = 4002
    FindMissingFonts = 4003
    FindMissingFootage = 4004
    WatchFolder = 2457

    RunScriptFile = 8000
    OpenScriptEditor = 8001

    CreateProxyStill = 2778
    CreateProxyMovie = 2779
    SetProxyFile = 2003
    SetProxyNone = 2119
    InterpretFootageMain = 2077
    InterpretFootageProxy = 2103
    InterpretFootageRememberInterpretation = 2254
    InterpretFootageApplyInterpretation = 2255
    ReplaceFootageFile = 2003
    ReplaceFootageWithLayeredComp = 3070
    ReplaceFootagePlaceholder = 2126
    ReplaceFootageSolid = 3000
    ReloadFootage = 2257
    RevealInExplorer = 2562
    RevealInFinder = 2562
    RevealInBridge = 3690

    ProjectSettings = 2611

    # Edit

    Undo = 16
    Redo = 2035
    Redo2 = 17

    Cut = 18
    Copy = 19
    CopyWithPropertyLinks = 10310
    CopyExpressionOnly = 53
    Paste = 20
    Clear = 21

    Duplicate = 2080
    SplitLayer = 2158
    LiftWorkArea = 2613
    ExtractWorkArea = 2614
    SelectAll = 23
    DeselectAll = 2004

    PurgeAllMemoryAndDiskCache = 10200
    PurgeAllMemory = 2373
    PurgeUndo = 2371
    PurgeImageCacheMemory = 2372
    PurgeSnapshot = 2481

    EditOriginal = 2142
    EditInAdobeAudition = 3697

    TemplatesRenderSettings = 2149
    TemplatesOutputModule = 2150
    PasteMochaMask = 5006

    # Composition

    NewComposition = 2000

    CompositionSettings = 2007
    SetPosterTime = 2012
    TrimCompToWorkArea = 2360
    CropCompToRegionOfInterest = 2997
    AddToAdobeMediaEncoderQueue = 3800
    AddToRenderQueue = 2161
    AddOutputModule = 2154

    SaveFrameAs = 2233
    SaveFrameAsPhotoshopLayers = 5001
    PreRender = 2780

    CompositionFlowchart = 2258
    CompositionMiniFlowchart = 3792

    # Layer

    NewText = 2836
    NewSolid = 2038
    NewLight = 2563
    NewCamera = 2564
    NewNullObject = 2767
    NewShapeLayer = 3736
    NewAdjustmentLayer = 2279
    # NewAdobePhotoshopFile = 3147
    # NewMAXONCINEMA4DFile = 4007
    LayerSettings = 2021

    OpenLayer = 3784
    OpenLayerSource = 2523
    # RevealInExplorer = 2562
    # RevealInFinder = 2562

    NewMask = 2367
    ResetMask = 2448
    RemoveMask = 2368
    RemoveAllMasks = 2369
    UnlockAllMasks = 2456
    LockOtherMasks = 2455
    HideLockedMasks = 2524

    QualityBest = 2045
    QualityDraft = 2044
    QualityWireframe = 2042
    QualityBilinear = 10207
    QualityBicubic = 10208

    HideOtherVideo = 2054
    ShowAllVideo = 2055
    UnlockAllLayers = 2244

    FlipHorizontal = 3766
    FlipVertical = 3767
    CenterInView = 3819
    CenterAnchorPointInLayerContent = 10312
    FitToComp = 2156
    FitToCompWidth = 2732
    FitToCompHeight = 2733
    EnableTimeRemapping = 2153
    TimeReverseLayer = 2135
    TimeStretch = 2024
    FreezeFrame = 3695
    AddMarker = 2157

    LayerStylesConvertToEditableStyles = 3740
    LayerStylesShowAll = 3743
    LayerStylesRemoveAll = 2072
    LayerStylesDropShadow = 9000
    LayerStylesInnerShadow = 9001
    LayerStylesOuterGlow = 9002
    LayerStylesInnerGlow = 9003
    LayerStylesBevelAndEmboss = 9004
    LayerStylesSatin = 9005
    LayerStylesColorOverlay = 9006
    LayerStylesGradientOverlay = 9007
    LayerStylesStroke = 9008

    GroupShapes = 3741
    UngroupShapes = 3742

    ConvertToEditableText = 3799
    CreateShapesFromText = 3781
    CreateMasksFromText = 2933
    CreateShapesFromVectorLayer = 3973
    CreateStereo3DRig = 3843
    CreateOrbitNull = 3844
    LinkFocusDistanceToPointOfInterest = 3845
    LinkFocusDistanceToLayer = 3847
    SetFocusDistanceToLayer = 3846
    AutoTrace = 3044
    PreCompose = 2071

    # Animation

    SaveAnimationPreset = 3075
    ApplyAnimationPreset = 2450
    RecentAnimationPreset1 = 2460
    RecentAnimationPreset2 = 2461
    RecentAnimationPreset3 = 2462
    RecentAnimationPreset4 = 2463
    RecentAnimationPreset5 = 2464
    BrowsePresets = 3691

    ConvertAudioToKeyframes = 5015
    ConvertExpressionToKeyframes = 2639
    RPFCameraImport = 5018
    SequenceLayers = 5003
    TimeReverseKeyframes = 3693

    RemoveAllTextAnimators = 3058

    AddExpression = 2702
    SeparateDimensions = 3764
    TrackCamera = 3983
    TrackInMochaAE = 5007
    WarpStabilizerVFX = 3986
    TrackMotion = 2568
    TrackMask = 10311
    TrackThisProperty = 2643

    RevealPropertiesWithKeyframes = 2387
    RevealPropertiesWithAnimation = 4011
    RevealAllModifiedProperties = 2771

    # View

    ZoomIn = 2092
    ZoomOut = 2093

    ResolutionFull = 2048
    ResolutionHalf = 2047
    ResolutionThird = 2081
    ResolutionQuarter = 2046
    ResolutionCustom = 2049

    UseDisplayColorManagement = 3704

    ShowRulers = 2280

    ShowGuides = 2274
    SnapToGuides = 2286
    LockGuides = 2275
    ClearGuides = 2276

    ShowGrid = 2277
    SnapToGrid = 2278

    ShowLayerControls = 2435

    # Window

    Align = 5022
    Audio = 2029
    Brushed = 3014
    Character = 3011
    EffectsAndPresets = 3718
    Info = 2028
    MaskInterpolation = 5027
    MediaBrowser = 4013
    Metadata = 3788
    MotionSketch = 5024
    Paint = 3045
    Paragraph = 3012
    Preview = 2031
    Progress = 4005
    Smoother = 5028
    Tools = 2010
    Tracker = 5005
    Wiggler = 5030


class AlphaMode(Enum):
    IGNORE = 5413
    PREMULTIPLIED = 5414
    STRAIGHT = 5412


class AutoOrientType(Enum):
    # Layer faces in the direction of the motion path.
    ALONG_PATH = 4213

    # Layer always faces the active camera or points at its point of interest.
    CAMERA_OR_POINT_OF_INTEREST = 4214

    # Each character in a per-character 3D text layer automatically faces the active camera.
    CHARACTERS_TOWARD_CAMERA = 4215

    # Layer rotates freely independent of any motion path point of interest or other layers.
    NO_AUTO_ORIENT = 4212


class BlendingMode(Enum):
    ADD = 5220
    ALPHA_ADD = 5244
    CLASSIC_COLOR_BURN = 5219
    CLASSIC_COLOR_DODGE = 5225
    CLASSIC_DIFFERENCE = 5234
    COLOR = 5238
    COLOR_BURN = 5218
    COLOR_DODGE = 5224
    DANCING_DISSOLVE = 5214
    DARKEN = 5215
    DARKER_COLOR = 5247
    DIFFERENCE = 5233
    DISSOLVE = 5213
    DIVIDE = 5249
    EXCLUSION = 5235
    HARD_LIGHT = 5228
    HARD_MIX = 5232
    HUE = 5236
    LIGHTEN = 5221
    LIGHTER_COLOR = 5246
    LINEAR_BURN = 5217
    LINEAR_DODGE = 5223
    LINEAR_LIGHT = 5229
    LUMINESCENT_PREMUL = 5245
    LUMINOSITY = 5239
    MULTIPLY = 5216
    NORMAL = 5212
    OVERLAY = 5226
    PIN_LIGHT = 5231
    SATURATION = 5237
    SCREEN = 5222
    SILHOUETE_ALPHA = 5242
    SILHOUETTE_LUMA = 5243
    SOFT_LIGHT = 5227
    STENCIL_ALPHA = 5240
    STENCIL_LUMA = 5241
    SUBTRACT = 5248
    VIVID_LIGHT = 5230


class ChannelType(Enum):
    CHANNEL_ALPHA = 7816
    CHANNEL_ALPHA_BOUNDARY = 7822
    CHANNEL_ALPHA_OVERLAY = 7821
    CHANNEL_BLUE = 7815
    CHANNEL_BLUE_COLORIZE = 7819
    CHANNEL_GREEN = 7814
    CHANNEL_GREEN_COLORIZE = 7818
    CHANNEL_RED = 7813
    CHANNEL_RED_COLORIZE = 7817
    CHANNEL_RGB = 7812
    CHANNEL_RGB_STRAIGHT = 7820


class CloseOptions(Enum):
    # Close without saving.
    DO_NOT_SAVE_CHANGES = 1212

    # Prompt for whether to save changes before close.
    PROMPT_TO_SAVE_CHANGES = 1213

    # Save automatically on close.
    SAVE_CHANGES = 1214


class FastPreviewType(Enum):
    FP_ADAPTIVE_RESOLUTION = 8013
    FP_DRAFT = 8014
    FP_FAST_DRAFT = 8015
    FP_OFF = 8012
    FP_WIREFRAME = 8016


class FeetFramesFilmType(Enum):
    MM16 = 2412
    MM35 = 2413


class FieldSeparationType(Enum):
    LOWER_FIELD_FIRST = 5614
    OFF = 5613
    UPPER_FIELD_FIRST = 5612


class FootageTimecodeDisplayStartType(Enum):
    FTCS_START_0 = 2213
    FTCS_USE_SOURCE_MEDIA = 2212


class FrameBlendingType(Enum):
    FRAME_MIX = 4013
    NO_FRAME_BLEND = 4012
    PIXEL_MOTION = 4014


class FramesCountType(Enum):
    FC_START_0 = 2612
    FC_START_1 = 2613
    FC_TIMECODE_CONVERSION = 2614


class GetSettingsFormat(Enum):
    NUMBER = 3413
    NUMBER_SETTABLE = 3414
    SPEC = 3412
    STRING = 3415
    STRING_SETTABLE = 3416


class GpuAccelType(Enum):
    CUDA = 1813
    METAL = 1814
    OPENCL = 1812
    SOFTWARE = 1816
    VULKAN = 1815


class ImportAsType(Enum):
    COMP = 3814
    COMP_CROPPED_LAYERS = 3812
    FOOTAGE = 3813
    PROJECT = 3815


class KeyframeInterpolationType(Enum):
    BEZIER = 6613
    HOLD = 6614
    LINEAR = 6612


class Language(Enum):
    CHINESE = 1619
    ENGLISH = 1612
    FRENCH = 1615
    GERMAN = 1614
    ITALIAN = 1616
    JAPANESE = 1613
    KOREAN = 1618
    PORTUGUESE = 1621
    RUSSIAN = 1620
    SPANISH = 1617


class LayerQuality(Enum):
    BEST = 4614
    DRAFT = 4613
    WIREFRAME = 4612


class LayerSamplingQuality(Enum):
    BICUBIC = 4813
    BILINEAR = 4812


class LightType(Enum):
    AMBIENT = 4415
    PARALLEL = 4412
    POINT = 4414
    SPOT = 4413


class LogType(Enum):
    ERRORS_AND_PER_FRAME_INFO = 3214
    ERRORS_AND_SETTINGS = 3213
    ERRORS_ONLY = 3212


class MaskFeatherFalloff(Enum):
    FFO_LINEAR = 7213
    FFO_SMOOTH = 7212


class MaskMode(Enum):
    ADD = 6813
    DARKEN = 6817
    DIFFERENCE = 6818
    INTERSECT = 6815
    LIGHTEN = 6816
    NONE = 6812
    SUBTRACT = 6814


class MaskMotionBlur(Enum):
    OFF = 7014
    ON = 7013
    SAME_AS_LAYER = 7012


class ParagraphJustification(Enum):
    CENTER_JUSTIFY = 7415
    FULL_JUSTIFY_LASTLINE_CENTER = 7418
    FULL_JUSTIFY_LASTLINE_FULL = 7419
    FULL_JUSTIFY_LASTLINE_LEFT = 7416
    FULL_JUSTIFY_LASTLINE_RIGHT = 7417
    LEFT_JUSTIFY = 7413
    MULTIPLE_JUSTIFICATIONS = 7412
    RIGHT_JUSTIFY = 7414


class PostRenderAction(Enum):
    IMPORT = 3613
    IMPORT_AND_REPLACE_USAGE = 3614
    NONE = 3612
    SET_PROXY = 3615


class PREFType(Enum):
    PREF_Type_MACHINE_INDEPENDENT = 8813
    PREF_Type_MACHINE_INDEPENDENT_COMPOSITION = 8816
    PREF_Type_MACHINE_INDEPENDENT_OUTPUT = 8815
    PREF_Type_MACHINE_INDEPENDENT_RENDER = 8814
    PREF_Type_MACHINE_SPECIFIC = 8812
    PREF_Type_MACHINE_SPECIFIC_PAINT = 8818
    PREF_Type_MACHINE_SPECIFIC_TEXT = 8817


class PropertyType(Enum):
    INDEXED_GROUP = 6214
    NAMED_GROUP = 6213
    PROPERTY = 6212


class PropertyValueType(Enum):
    COLOR = 6418
    CUSTOM_VALUE = 6419
    LAYER_INDEX = 6421
    MARKER = 6420
    MASK_INDEX = 6422
    NO_VALUE = 6412
    OneD = 6417
    SHAPE = 6423
    TEXT_DOCUMENT = 6424
    ThreeD = 6414
    ThreeD_SPATIAL = 6413
    TwoD = 6416
    TwoD_SPATIAL = 6415


class PulldownMethod(Enum):
    ADVANCE_24P = 6013
    PULLDOWN_3_2 = 6012


class PulldownPhase(Enum):
    OFF = 5813
    SSWWW = 5814
    SWWWS = 5815
    SWWWW_24P_ADVANCE = 5821
    WSSWW = 5812
    WSWWW_24P_ADVANCE = 5820
    WWSSW = 5817
    WWSWW_24P_ADVANCE = 5819
    WWWSS = 5816
    WWWSW_24P_ADVANCE = 5818
    WWWWS_24P_ADVANCE = 5822


class PurgeTarget(Enum):
    # Purges all data that After Effects has cached to physical memory.
    ALL_CACHES = 1412

    # Purges all saved image data.
    IMAGE_CACHES = 1415

    # Purges all data cached as composition/layer snapshots.
    SNAPSHOT_CACHES = 1414

    # Purges all data saved in the undo cache.
    UNDO_CACHES = 1413


class ResolveType(Enum):
    ACCEPT_THEIRS = 8612
    ACCEPT_THEIRS_AND_COPY = 8613
    ACCEPT_YOURS = 8614


class RQItemStatus(Enum):
    DONE = 3019
    ERR_STOPPED = 3018
    NEEDS_OUTPUT = 3013
    QUEUED = 3015
    RENDERING = 3016
    UNQUEUED = 3014
    USER_STOPPED = 3017
    WILL_CONTINUE = 3012


class TimeDisplayType(Enum):
    FRAMES = 2013
    TIMECODE = 2012


class ToolType(Enum):
    Tool_Arrow = 9012
    Tool_CameraDollyCamera = 9017
    Tool_CameraDollyToCursor = 9048
    Tool_CameraDollyTowardsCursor = 9047
    Tool_CameraMaya = 9014
    Tool_CameraOrbit = 9015
    Tool_CameraOrbitCamera = 9015
    Tool_CameraOrbitCursor = 9044
    Tool_CameraOrbitScene = 9045
    Tool_CameraPanCamera = 9016
    Tool_CameraPanCursor = 9046
    Tool_CameraTrackXY = 9016
    Tool_CameraTrackZ = 9017
    Tool_CloneStamp = 9019
    Tool_Eraser = 9020
    Tool_Feather = 9032
    Tool_Hairbrush = 9042
    Tool_Hand = 9021
    Tool_Magnify = 9022
    Tool_Oval = 9026
    Tool_Paintbrush = 9018
    Tool_PanBehind = 9023
    Tool_Pen = 9031
    Tool_PenConvert = 9035
    Tool_PenMinus = 9034
    Tool_PenPlus = 9033
    Tool_Pin = 9036
    Tool_PinAdvanced = 9043
    Tool_PinBend = 9038
    Tool_PinDepth = 9040
    Tool_PinStarch = 9037
    Tool_Polygon = 9027
    Tool_Quickselect = 9041
    Tool_Rect = 9024
    Tool_Rotate = 9013
    Tool_RoundedRect = 9025
    Tool_Star = 9028
    Tool_TextH = 9029
    Tool_TextV = 9030


class TrackMatteType(Enum):
    ALPHA = 5013
    ALPHA_INVERTED = 5014
    LUMA = 5015
    LUMA_INVERTED = 5016
    NO_TRACK_MATTE = 5012


class ViewerType(Enum):
    VIEWER_COMPOSITION = 7612
    VIEWER_FOOTAGE = 7614
    VIEWER_LAYER = 7613


_PropertyClasses = Union["Property", "PropertyGroup", "MaskPropertyGroup"]
_ItemClasses = Union["CompItem", "FootageItem", "FolderItem"]


def clear_output() -> None:
    """Clears text from the Info panel."""
    pass


def generate_random_number() -> float:
    """Generates random numbers."""
    return 0


def current_format_to_time(formatted_time: str, fps: float, is_duration: bool = False) -> float:
    """Converts string time value to a numeric time value."""
    return 0


def time_to_current_format(time: float, fps: float, is_duration: bool = False) -> str:
    """Converts a numeric time value to a string time value."""
    return ""


def write(text: str) -> None:
    """Writes text to the Info panel, with no line break added."""
    pass


def writeIn(text: str) -> None:
    """Writes text to the Info panel, adding a line break at the end."""
    pass


def is_valid(obj: object) -> bool:
    """When true, the specified object exists."""
    return True


class Application:
    def __init__(self):
        self._project: Project
        self._version: str
        self._buildName: str
        self._buildNumber: int
        self._isWatchFolder: bool
        self._isRenderEngine: bool
        self._language: Language
        self._settings: Settings
        self._isoLanguage: str
        self._memoryInUse: int
        self._preferences: Preferences
        self._activeViewer: Viewer | None
        self._effects: list
        self._availableGPUAccelTypes: GpuAccelType
        self._disableRendering: bool
        self._onError: str | None
        self._exitCode: int
        self._exitAfterLaunchAndEval: bool
        self._saveProjectOnCrash: bool

    @property
    def project(self) -> "Project":
        """The current After Effects project."""
        return self._project

    @property
    def version(self) -> str:
        """The version number of the After Effects application."""
        return self._version

    @property
    def buildName(self) -> str:
        """The name of this build of the application."""
        return self._buildName

    @property
    def buildNumber(self) -> int:
        """The number of this build of the application."""
        return self._buildNumber

    @property
    def isWatchFolder(self) -> bool:
        """When true, the local application is running in Watch Folder mode."""
        return self._isWatchFolder

    @property
    def isRenderEngine(self) -> bool:
        """When true, the local After Effects application is running as a render engine."""
        return self._isRenderEngine

    @property
    def language(self) -> Language:
        """The language After Effects is running."""
        return self._language

    @property
    def settings(self) -> "Settings":
        """Application settings that can be set via scripting."""
        return self._settings

    @property
    def isoLanguage(self) -> str:
        """The locale (language and region) in which the application is running."""
        return self._isoLanguage

    @property
    def memoryInUse(self) -> int:
        """Memory in use by this application."""
        return self._memoryInUse

    @property
    def preferences(self) -> "Preferences":
        """Preferences"""
        return self._preferences

    @property
    def activeViewer(self) -> Union["Viewer", None]:
        """The currently focused or last-focused viewer panel."""
        return self._activeViewer

    @property
    def effects(self) -> list[dict]:
        """The effects available in the application."""
        return self._effects

    @property
    def availableGPUAccelTypes(self) -> GpuAccelType:
        """The Viewer object for the currently focused or active-focused viewer panel."""
        return self._availableGPUAccelTypes

    @property
    def disableRendering(self) -> bool:
        """Set to true to disable rendering as if Caps Lock were turned on."""
        return self._disableRendering

    @property
    def onError(self) -> str | None:
        """A callback function that is called when an error occurs in the application."""
        return self._onError

    @property
    def exitCode(self) -> int:
        return self._exitCode

    @property
    def exitAfterLaunchAndEval(self) -> bool:
        """When true, the application remains open after running a script from the command line on Windows."""
        return self._exitAfterLaunchAndEval

    @property
    def saveProjectOnCrash(self) -> bool:
        """When true, the project is saved if the application closes unexpectedly."""
        return self._saveProjectOnCrash

    def newProject(self) -> Union["Project", None]:
        """Creates a new project in After Effects."""
        pass

    def open(self, file: Union[File, None] = None) -> Union["Project", None]:
        """Opens a project or an Open Project dialog box."""
        pass

    def quit(self) -> None:
        """Quits the application."""
        pass

    def watchFolder(self, folder_object_to_watch: Folder) -> None:
        """Starts Watch Folder mode; does not return until Watch Folder mode is turned off."""
        pass

    def pauseWatchFolder(self, pause: bool) -> None:
        """Pauses a current watch-folder process."""
        pass

    def endWatchFolder(self) -> None:
        """Ends a current watch-folder process."""
        pass

    def purge(self, target: PurgeTarget) -> None:
        """Purges a targeted type of cached information(replicates Purge options in the Edit menu)."""
        pass

    def beginUndoGroup(self, undoString: str) -> None:
        """Groups the actions that follow it into a single undoable step."""
        pass

    def endUndoGroup(self) -> None:
        """Ends an undo group; needed only when a script contains more than one undo group."""
        pass

    def beginSuppressDialogs(self) -> None:
        """Groups the actions that follow it into a single undoable step."""
        pass

    def endSuppressDialogs(self, alert: bool) -> None:
        """Ends suppression of dialogs in the user interface."""
        pass

    def setMemoryUsageLimits(self, imageCachePercentage: int, maximumMemoryPercentage: int) -> None:
        """Sets memory usage limits as in the Memory & Cache preferences area."""
        pass

    def setSavePreferencesOnQuit(self, doSave: bool) -> None:
        """Sets whether preferences are saved when the application is quit."""
        pass

    def activate(self) -> None:
        """Brings the After Effects main window to the front of the screen."""
        pass

    def scheduleTask(self, stringToExecute: str, delay: int, repeat: bool) -> int:
        """Schedules a JavaScript script for delayed execution."""
        return 0

    def cancelTask(self, taskID: int) -> None:
        """Cancels a scheduled task."""
        pass

    def parseSwatchFile(self, file: File) -> "_Swatch":
        """Loads a color swatch from an Adobe Swatch Exchange (ASE) file."""
        return _Swatch()

    def findMenuCommandId(self, str: str) -> int:
        return 0

    def executeCommand(self, id: int) -> None:
        pass

    def getenv(self, name: str) -> str:
        return ""

    def setTimeout(self, func: Callable, delay: int = 0) -> int:
        return 0

    def cancelTimeout(self, id: int) -> None:
        pass


class Preferences:
    def deletePref(self, section: str, key: str, type: Optional[PREFType] = None) -> None:
        pass

    def getPrefAsBool(self, section: str, key: str, type: Optional[PREFType] = None) -> bool:
        return True

    def getPrefAsFloat(self, section: str, key: str, type: Optional[PREFType] = None) -> float:
        return 0

    def getPrefAsLong(self, section: str, key: str, type: Optional[PREFType] = None) -> int:
        return 0

    def getPrefAsString(self, section: str, key: str, type: Optional[PREFType] = None) -> str:
        return ""

    def havePref(self, section: str, key: str, type: Optional[PREFType] = None) -> bool:
        return True

    def reload(self) -> None:
        pass

    def savePrefAsBool(self, section: str, key: str, value: bool, type: Optional[PREFType] = None) -> None:
        pass

    def savePrefAsFloat(self, section: str, key: str, value: float, type: Optional[PREFType] = None) -> None:
        pass

    def savePrefAsLong(self, section: str, key: str, value: int, type: Optional[PREFType] = None) -> None:
        pass

    def savePrefAsString(self, section: str, key: str, value: str, type: Optional[PREFType] = None) -> None:
        pass

    def saveToDisk(self) -> None:
        pass


class AVItem("Item"):
    def __init__(self):
        self._proxySource: FootageSource
        self._usedIn: list[CompItem] = []
        self._hasVideo: bool = False
        self._hasAudio: bool = False
        self._footageMissing: bool = False
        self._isMediaReplacementCompatible: bool = False
        self.width: float = 0.0
        self.height: float = 0.0
        self.pixelAspect: float = 1.0
        self.frameRate: float = 0.0
        self.frameDuration: float = 0.0
        self.duration: float = 0.0
        self.useProxy: bool = False
        self.time: float = 0.0

    @property
    def proxySource(self) -> "FootageSource":
        """The FootageItem object used as proxy for the item."""
        return self._proxySource

        """The CompItem objects that use this item."""

    @property
    def usedIn(self) -> list["CompItem"]:
        return []

    @property
    def hasVideo(self) -> bool:
        """When true, the item has a video component."""
        return True

    @property
    def hasAudio(self) -> bool:
        """When true, the item has an audio component."""
        return True

    @property
    def footageMissing(self) -> bool:
        """When true, the item cannot be found or is a placeholder."""
        return True

    @property
    def isMediaReplacementCompatible(self) -> bool:
        """True if the AVItem can be used as an alternate source when calling Property.setAlternateSource"""
        return True

    def setProxy(self, file: File) -> None:
        """Sets a proxy for the item."""
        pass

    def setProxyWithSequence(self, file: File, forceAlphabetical: bool) -> None:
        """Sets a sequence as a proxy for the item."""
        pass

    def setProxyWithSolid(
        self, color: ThreeDColorValue, name: str, width: float, height: float, pixelAspect: float
    ) -> None:
        """Sets a solid as a proxy for the item."""
        pass

    def setProxyWithPlaceholder(
        self, name: str, width: float, height: float, frameRate: float, duration: float
    ) -> None:
        """Sets a placeholder as a proxy for the item."""
        pass

    def setProxyToNone(self) -> None:
        """Removes the proxy for the item."""
        pass


class AVLayer(Layer):
    # The source item for this layer.
    @property
    def source(self) -> Any:
        return self._source

    # When true, the layer has no expressly set name, but contains a named source.
    @property
    def isNameFromSource(self) -> bool:
        return self._isNameFromSource

    # The height of the layer.
    @property
    def height(self) -> int:
        return self._height

    # The width of the layer.
    @property
    def width(self) -> int:
        return self._width

    # When true, it is legal to change the value of collapseTransformation.
    @property
    def canSetCollapseTransformation(self) -> bool:
        return self._canSetCollapseTransformation

    # When true, frame blending is enabled.
    @property
    def frameBlending(self) -> bool:
        return self._frameBlending

    # When true, it is legal to change the value of timeRemapEnabled.
    @property
    def canSetTimeRemapEnabled(self) -> bool:
        return self._canSetTimeRemapEnabled

    # When true, the layer contains an audio component.
    @property
    def hasAudio(self) -> bool:
        return self._hasAudio

    # When true, the layer's audio is active at the current time.
    @property
    def audioActive(self) -> bool:
        return self._audioActive

    # When true, this layer is being used as a track matte for the layer below it.
    @property
    def isTrackMatte(self) -> bool:
        return self._isTrackMatte

    # When true, the layer above is being used as a track matte on this layer.
    @property
    def hasTrackMatte(self) -> bool:
        return self._hasTrackMatte

    # When true, the layer's audio is enabled.
    @property
    def audioEnabled(self) -> bool:
        return self._audioEnabled

    @audioEnabled.setter
    def audioEnabled(self, value: bool) -> None:
        self._audioEnabled = value

    # When true, the layer's motion blur is enabled.
    @property
    def motionBlur(self) -> bool:
        return self._motionBlur

    @motionBlur.setter
    def motionBlur(self, value: bool) -> None:
        self._motionBlur = value

    # When true, the layer's effects are active.
    @property
    def effectsActive(self) -> bool:
        return self._effectsActive

    # When true, this is an adjustment layer.
    @property
    def adjustmentLayer(self) -> bool:
        return self._adjustmentLayer

    # When true, this is an environment layer.
    @property
    def environmentLayer(self) -> bool:
        return self._environmentLayer

    # When true, this is a guide layer.
    @property
    def guideLayer(self) -> bool:
        return self._guideLayer

    # When true, this is a 3D layer.
    @property
    def threeDLayer(self) -> bool:
        return self._threeDLayer

    # When true, 3D is set on a per-character basis in this text layer.
    @property
    def threeDPerChar(self) -> bool:
        return self._threeDPerChar

    # When true, collapse transformation is on.
    @property
    def collapseTransformation(self) -> bool:
        return self._collapseTransformation

    @collapseTransformation.setter
    def collapseTransformation(self, value: bool) -> None:
        self._collapseTransformation = value

    # The type of frame blending for the layer.
    @property
    def frameBlendingType(self) -> FrameBlendingType:
        return self._frameBlendingType

    # When true, time remapping is enabled on this layer.
    @property
    def timeRemapEnabled(self) -> bool:
        return self._timeRemapEnabled

    # The blending mode of the layer.
    @property
    def blendingMode(self) -> BlendingMode:
        return self._blendingMode

    # When true, preserve transparency is enabled.
    @property
    def preserveTransparency(self) -> bool:
        return self._preserveTransparency

    # The layer sampling quality setting.
    @property
    def samplingQuality(self) -> LayerSamplingQuality:
        return self._samplingQuality

    # if layer has a track matte, specifies the way it is applied.
    @property
    def trackMatteType(self) -> TrackMatteType:
        return self._trackMatteType

    # The layer quality setting.
    @property
    def quality(self) -> LayerQuality:
        return self._quality

    # Reports whether this layer's audio is active at a given time.
    def audioActiveAtTime(self, time: int) -> bool:
        return self._audioActiveAtTime(time)

    # Calculates a transformation from a set of points in this layer.
    def calculateTransformFromPoints(
        self,
        pointTopLeft: Tuple[int, int, int],
        pointTopRight: Tuple[int, int, int],
        pointBottomRight: Tuple[int, int, int],
    ) -> dict[str, Any]:
        return self._calculateTransformFromPoints(pointTopLeft, pointTopRight, pointBottomRight)

    # Converts composition coordinates, such as sourcePointToComp, to layer coordinates.
    def sourcePointToComp(self, point: Tuple[int, int]) -> Tuple[int, int]:
        return self._sourcePointToComp(point)

    # Converts composition coordinates, such as sourcePointToComp, to layer coordinates.
    def compPointToSource(self, point: Tuple[int, int]) -> Tuple[int, int]:
        return self._compPointToSource(point)

    # Opens the layer in a Layer panel.
    def openInViewer(self) -> Optional["Viewer"]:
        return self._openInViewer()

    # Changes the source item for this layer.
    def replaceSource(self, newSource: AVItem, fixExpressions: bool) -> None:
        self._replaceSource(newSource, fixExpressions)

    # Retrieves the source rectangle of a layer.
    def sourceRectAtTime(self, timeT: int, extents: bool) -> dict[str, int]:
        return self._sourceRectAtTime(timeT, extents)

    # Shortcuts
    @property
    def timeRemap(self) -> "OneDProperty":
        return self._timeRemap

    @property
    def mask(self) -> "MaskPropertyGroup":
        return self._mask

    @property
    def effect(self) -> "PropertyGroup":
        return self._effect

    @property
    def layerStyle(self) -> "_LayerStyles":
        return self._layerStyle

    @property
    def geometryOption(self) -> "_GeometryOptionsGroup":
        return self._geometryOption

    @property
    def materialOption(self) -> "_MaterialOptionsGroup":
        return self._materialOption

    @property
    def audio(self) -> "_AudioGroup":
        return self._audio


class CameraLayer(Layer):
    # The CameraLayer object represents a camera layer within a composition. Create it using the LayerCollection object’s addCamera method */

    # Shortcuts
    @property
    def cameraOption(self) -> "_CameraOptionsGroup":
        return _CameraOptionsGroup()


class Collection:
    # The number of objects in the collection.
    @property
    def length(self) -> int:
        return 1


class CompItem(AVItem):
    def __init__(self):
        # 初始化属性
        self._num_layers = 0
        self._active_camera = None  # 类型应为 CameraLayer | None
        self._layers = LayerCollection()
        self._marker_property = MarkerValueProperty()
        self._selected_layers = []  # 类型应为 List[Layer]
        self._selected_properties = []  # 类型应为 List[_PropertyClasses]
        self._renderers = []  # 类型应为 List[str]
        self._frame_duration = 0.0
        self._work_area_start = 0.0
        self._work_area_duration = 0.0
        self._hide_shy_layers = False
        self._motion_blur = False
        self._draft3d = False
        self._frame_blending = False
        self._preserve_nested_frame_rate = False
        self._preserve_nested_resolution = False
        self._bg_color = ThreeDColorValue((0.0, 0.0, 0.0))
        self._display_start_time = 0.0
        self._resolution_factor = (1.0, 1.0)
        self._shutter_angle = 0.0
        self._shutter_phase = 0.0
        self._motion_blur_samples_per_frame = 0
        self._motion_blur_adaptive_sample_limit = 0
        self._renderer = ""
        self._drop_frame = False

    @property
    def num_layers(self) -> int:
        """The number of layers in the composition."""
        return self._num_layers

    @property
    def active_camera(self) -> CameraLayer:
        """The current active camera layer."""
        return CameraLayer()

    def duplicate(self) -> "CompItem":
        """Creates and returns a duplicate of this composition."""
        return CompItem()

    def layer(self, index_or_layer_or_name) -> "Layer":
        """Gets a layer from this composition."""
        return Layer()

    def open_in_viewer(self) -> "Viewer":
        """Opens the composition in a Composition panel."""
        return Viewer()

    def save_frame_to_png(self, time: float, file: File) -> None:
        """Save the specific frame to a png file"""
        pass

    def ram_preview_test(self, unknown: Any, zoom: float, exposure: float) -> None:
        """Open this Composition in the Preview panel, and change the zoom and exposure settings."""
        pass


class FolderItem(Item):
    """The FolderItem object corresponds to a folder in your Project panel. It can contain various types of items (footage, compositions, solids) as well as other folders."""

    @property
    def items(self) -> "ItemCollection":
        """The contents of this folder."""
        ...

    @property
    def numItems(self) -> int:
        """The number of items contained in the folder."""
        ...

    def item(self, index: int) -> "_ItemClasses":
        """Gets an item from the folder."""
        return _ItemClasses


class FootageItem(AVItem):
    """The FootageItem object represents a footage item imported into a project, which appears in the Project panel. These are accessed by position index number in a project’s item collection."""

    @property
    def file(self) -> File | None:
        """The footage source file."""
        ...

    @property
    def mainSource(self) -> "FootageSource":
        """All settings related to the footage item."""
        ...

    def open_in_viewer(self) -> Optional["Viewer"]:
        """Opens the footage in a Footage panel."""
        pass

    def replace(self, file: File) -> None:
        """Replaces a footage file with another footage file."""
        pass

    def replace_with_placeholder(self, name: str, width: int, height: int, frame_rate: float, duration: float) -> None:
        """Replaces a footage file with a placeholder object."""
        pass

    def replace_with_sequence(self, file: File, force_alphabetical: bool) -> None:
        """Replaces a footage file with an image sequence."""
        pass

    def replace_with_solid(
        self, color: ThreeDColorValue, name: str, width: int, height: int, pixel_aspect: float
    ) -> None:
        """Replaces a footage file with a solid."""
        pass


class PlaceholderItem(FootageItem):
    ...


class FootageSource:
    # The footage source file.
    @property
    def file(self) -> File | None:
        return

    # When true, footage is a still image.
    @property
    def isStill(self) -> bool:
        return True

    # The effective frame rate as displayed and rendered in compositions by After Effects.
    @property
    def displayFrameRate(self) -> float:
        return 0

    # When true, a footage clip or proxy includes an alpha channel.
    hasAlpha: bool
    # The mode of an alpha channel.
    alphaMode: AlphaMode
    # The color to be premultiplied.
    premulColor: ThreeDColorValue
    # When true, an alpha channel in a footage clip or proxy should be inverted.
    invertAlpha: bool
    # The field separation type.
    fieldSeparationType: FieldSeparationType
    # How the fields are to be separated in non-still footage.
    highQualityFieldSeparation: bool
    # The pulldown type for the footage.
    removePulldown: PulldownPhase
    # How many times an image sequence is set to loop.
    loop: int
    # The native frame rate of the footage.
    nativeFrameRate: float
    # The rate to which footage should conform.
    conformFrameRate: float

    def guessAlphaMode(self) -> None:
        """Estimates the alphaMode setting."""
        pass

    def guessPulldown(self, method: PulldownMethod) -> None:
        """Estimates the pulldownType setting."""
        pass


class ImportOptions:
    def __init__(self, file: Optional[File] = None):
        pass

    # The type of file to be imported.
    importAs: ImportAsType

    # When true, import a sequence of files, rather than an individual file.
    sequence: bool

    # When true, the “Force alphabetical order” option is set.
    forceAlphabetical: bool

    # The file to import, or the first file of the sequence to import.
    file: File

    def canImportAs(self, type: ImportAsType) -> bool:
        """Restricts input to a particular file type."""
        return True


class Item:
    # A unique identifier for self.item.
    @property
    def id(self) -> int:
        return 0

    # The type of item.
    @property
    def typeName(self) -> str:
        return ""

    # The name of the object as shown in the Project panel.
    name: str

    # A descriptive string.
    comment: str

    # The parent folder of self.item.
    parentFolder: FolderItem

    # When true, self.item is currently selected.
    selected: bool

    # The label color for the item.
    label: int

    def addGuide(self, orientationType: int, position: int) -> int:
        """Creates a new guide and adds it to the guides object of the Item."""
        return 0

    def removeGuide(self, guideIndex: int) -> None:
        """Removes an existing guide."""
        pass

    def setGuide(self, position: int, guideIndex: int) -> None:
        """Modifies the position of an existing guide."""
        pass

    def remove(self) -> None:
        """Deletes the item from the project."""
        pass


class ItemCollection(Collection):
    # Retrieves a Item object in the collection by its index number. The first object is at index 1.
    def __getitem__(self, index: int) -> _ItemClasses:
        return _ItemClasses

    # Creates a new CompItem object and adds it to the collection.
    def addComp(self, name: str, width: int, height: int, pixelAspect: int, duration: int, frameRate: int) -> CompItem:
        return CompItem()

    # Creates a new FolderItem object and adds it to the collection.
    def addFolder(self, name: str) -> FolderItem:
        return FolderItem()


class KeyframeEase:
    def __init__(self, speed: float, influence: float):
        pass

    # The speed setting for a keyframe.
    @property
    def speed(self) -> float:
        return 0

    # The influence setting for a keyframe.
    @property
    def influence(self) -> float:
        return 0


class Layer(PropertyGroup):
    # The index position of the layer.
    @property
    def index(self) -> int:
        return 0

    # The current time of the layer.
    @property
    def time(self) -> float:
        return 0.0

    # When true, the layer contains a video component.
    @property
    def hasVideo(self) -> bool:
        return False

    # When true, the layer is active at the current time.
    @property
    def active(self) -> bool:
        return False

    # When true, self.is a null layer.
    @property
    def nullLayer(self) -> bool:
        return False

    # All selected AE properties in the layer.
    @property
    def selectedProperties(self) -> List[_PropertyClasses]:
        return []

    # The composition that contains self.layer.
    @property
    def containingComp(self) -> CompItem:
        return CompItem()

    # When true, the layer’s name has been explicitly set.
    @property
    def isNameSet(self) -> bool:
        return False

    # The name of the layer.
    @property
    def name(self) -> str:
        return ""

    # The parent of self.layer.
    @property
    def parent(self) -> Optional["Layer"]:
        return None

    # The start time of the layer.
    @property
    def startTime(self) -> float:
        return 0.0

    # The time stretch percentage of the layer.
    @property
    def stretch(self) -> float:
        return 0.0

    # The “in” point of the layer.
    @property
    def inPoint(self) -> float:
        return 0.0

    # The “out” point of the layer.
    @property
    def outPoint(self) -> float:
        return 0.0

    # When true, the layer is enabled.
    @property
    def enabled(self) -> bool:
        return False

    # When true, the layer is soloed.
    @property
    def solo(self) -> bool:
        return False

    # When true, the layer is shy.
    @property
    def shy(self) -> bool:
        return False

    # When true, the layer is locked.
    @property
    def locked(self) -> bool:
        return False

    # A descriptive comment for the layer.
    @property
    def comment(self) -> str:
        return ""

    # The label color for the layer.
    @property
    def label(self) -> int:
        return 0

    # The type of automatic orientation for the layer.
    @property
    def autoOrient(self) -> AutoOrientType:
        return AutoOrientType()

    # Shortcuts
    @property
    def marker(self) -> "MarkerValueProperty":
        return MarkerValueProperty()

    @property
    def transform(self) -> "_TransformGroup":
        return _TransformGroup()

    # Transform shortcuts
    @property
    def anchorPoint(self) -> Union["TwoDProperty", "ThreeDProperty"]:
        return TwoDProperty()

    @property
    def position(self) -> Union["TwoDProperty", "ThreeDProperty"]:
        return TwoDProperty()

    @property
    def xPosition(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def yPosition(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def zPosition(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def scale(self) -> Union["TwoDProperty", "ThreeDProperty"]:
        return TwoDProperty()

    @property
    def orientation(self) -> "ThreeDProperty":
        return ThreeDProperty()

    @property
    def rotation(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def xRotation(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def yRotation(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def zRotation(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def opacity(self) -> "OneDProperty":
        return OneDProperty()

    @property
    def pointOfInterest(self) -> "ThreeDProperty":
        return ThreeDProperty()

    @property
    def moveToBeginning(self) -> None:
        """Moves the layer to the top of the composition (makes it the first layer)."""
        pass

    @property
    def moveToEnd(self) -> None:
        """Moves the layer to the bottom of the composition (makes it the last layer)."""
        pass

    @property
    def moveAfter(self, layer: "Layer") -> None:
        """Moves the layer below another layer."""
        pass

    @property
    def moveBefore(self, layer: "Layer") -> None:
        """Moves the layer above another layer."""
        pass

    @property
    def duplicate(self) -> "Layer":
        """Duplicates the layer."""
        return Layer()

    @property
    def copyToComp(self, intoComp: CompItem) -> None:
        """Copies the layer to the top (beginning) of another composition."""
        return

    @property
    def activeAtTime(self, time: float) -> bool:
        """Reports whether self.layer will be active at a specified time."""
        return False

    @property
    def setParentWithJump(self, newParent: Optional["Layer"] = None) -> None:
        """Sets a new parent for self.layer."""
        pass

    @property
    def applyPreset(self, presetName: File) -> None:
        """Applies a named collection of animation settings to the layer."""
        pass

    # Shortcuts
    @property
    def marker(self) -> "MarkerValueProperty":
        return MarkerValueProperty()

    @property
    def transform(self) -> "_TransformGroup":
        return _TransformGroup()


class KeyframeEase:
    def __init__(self, speed: float, influence: float):
        self.speed: float = speed
        self.influence: float = influence


class Layer(PropertyGroup):
    @property
    def index(self) -> int:
        """The index position of the layer."""
        return 0

    @property
    def time(self) -> float:
        """The current time of the layer."""
        return 0.0

    @property
    def hasVideo(self) -> bool:
        """When true, the layer contains a video component."""
        return False

    @property
    def active(self) -> bool:
        """When true, the layer is active at the current time."""
        return False

    @property
    def nullLayer(self) -> bool:
        """When true, this is a null layer."""
        return False

    @property
    def selectedProperties(self) -> List[_PropertyClasses]:
        """All selected AE properties in the layer."""
        return []

    @property
    def containingComp(self) -> CompItem:
        """The composition that contains this layer."""
        return CompItem()

    @property
    def isNameSet(self) -> bool:
        """When true, the layer’s name has been explicitly set."""
        return False

    @property
    def name(self) -> str:
        """The name of the layer."""
        return ""

    @property
    def parent(self) -> Optional[Layer]:
        """The parent of this layer."""
        return None

    @property
    def startTime(self) -> float:
        """The start time of the layer."""
        return 0.0

    @property
    def stretch(self) -> float:
        """The time stretch percentage of the layer."""
        return 100.0

    @property
    def inPoint(self) -> float:
        """The “in” point of the layer."""
        return 0.0

    @property
    def outPoint(self) -> float:
        """The “out” point of the layer."""
        return 0.0

    @property
    def enabled(self) -> bool:
        """When true, the layer is enabled."""
        return True

    @property
    def solo(self) -> bool:
        """When true, the layer is soloed."""
        return False

    @property
    def shy(self) -> bool:
        """When true, the layer is shy."""
        return False

    @property
    def locked(self) -> bool:
        """When true, the layer is locked."""
        return False

    @property
    def comment(self) -> str:
        """A descriptive comment for the layer."""
        return ""

    @property
    def label(self) -> int:
        """The label color for the layer."""
        return 0

    @property
    def autoOrient(self) -> AutoOrientType:
        """The type of automatic orientation for the layer."""
        return AutoOrientType.AUTO_ORIENT_OFF

    def moveToBeginning(self) -> None:
        """Moves the layer to the top of the composition (makes it the first layer)."""
        pass

    def moveToEnd(self) -> None:
        """Moves the layer to the bottom of the composition (makes it the last layer)."""
        pass

    def moveAfter(self, layer: Layer) -> None:
        """Moves the layer below another layer."""
        pass

    def moveBefore(self, layer: Layer) -> None:
        """Moves the layer above another layer."""
        pass

    def duplicate(self) -> Layer:
        """Duplicates the layer."""
        return Layer()

    def copyToComp(self, intoComp: CompItem) -> None:
        """Copies the layer to the top (beginning) of another composition."""
        pass

    def activeAtTime(self, time: float) -> bool:
        """Reports whether this layer will be active at a specified time."""
        return False

    def setParentWithJump(self, newParent: Optional[Layer] = None) -> None:
        """Sets a new parent for this layer."""
        pass

    def applyPreset(self, presetName: File) -> None:
        """Applies a named collection of animation settings to the layer."""
        pass

    @property
    def marker(self) -> MarkerValueProperty:
        """Shortcuts"""
        return MarkerValueProperty()

    @property
    def transform(self) -> _TransformGroup:
        """Shortcuts"""
        return _TransformGroup()

    @property
    def anchorPoint(self) -> Union[TwoDProperty, ThreeDProperty]:
        """Transform shortcuts"""
        return TwoDProperty()

    @property
    def position(self) -> Union[TwoDProperty, ThreeDProperty]:
        """Transform shortcuts"""
        return TwoDProperty()

    @property
    def xPosition(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def yPosition(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def zPosition(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def scale(self) -> Union[TwoDProperty, ThreeDProperty]:
        """Transform shortcuts"""
        return TwoDProperty()

    @property
    def orientation(self) -> ThreeDProperty:
        """Transform shortcuts"""
        return ThreeDProperty()

    @property
    def rotation(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def xRotation(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def yRotation(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def zRotation(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def opacity(self) -> OneDProperty:
        """Transform shortcuts"""
        return OneDProperty()

    @property
    def pointOfInterest(self) -> ThreeDProperty:
        """Transform shortcuts"""
        return ThreeDProperty()


class LayerCollection(Collection):
    """Retrieves a Layer object in the collection by its index number. The first object is at index 1."""

    def __getitem__(self, index: int) -> Layer:
        return self[index]

    """Creates a new AVLayer and adds it to this collection."""

    def add(self, item: AVItem, duration: Optional[float] = None) -> AVLayer:
        return AVLayer()

    """Creates a new, null layer and adds it to this collection."""

    def addNull(self, duration: Optional[float] = None) -> AVLayer:
        return AVLayer()

    """Creates a new layer, a FootageItem with a SolidSource, and adds it to this collection."""

    def addSolid(
        self,
        color: ThreeDColorValue,
        name: str,
        width: int,
        height: int,
        pixelAspect: float,
        duration: Optional[float] = None,
    ) -> AVLayer:
        return AVLayer()

    """Creates a new paragraph (box) text layer and adds it to this collection."""

    def addBoxText(self, size: Tuple[int, int], sourceText: Optional[Union[str, "TextDocument"]] = None) -> TextLayer:
        return TextLayer()

    """Creates a new point text layer and adds it to this collection."""

    def addText(self, sourceText: Optional[Union[str, "TextDocument"]] = None) -> "TextLayer":
        return TextLayer()

    """Creates a new camera layer and adds it to this collection."""

    def addCamera(self, name: str, centerPoint: Tuple[int, int]) -> CameraLayer:
        return CameraLayer()

    """Creates a new light layer and adds it to this collection."""

    def addLight(self, name: str, centerPoint: Tuple[int, int]) -> "LightLayer":
        return LightLayer()

    """Creates a new shape layer and adds it to this collection."""

    def addShape(self) -> ShapeLayer:
        return ShapeLayer()

    """Retrieves the layer object with a specified name."""

    def byName(self, name: str) -> Optional[Layer]:
        return Layer()

    """Collects specified layers into a new composition."""

    def precompose(self, layerIndices: List[int], name: str, moveAllAttributes: Optional[bool] = False) -> CompItem:
        return CompItem()


class LightLayer(Layer):
    """Shortcuts"""

    @property
    def lightOption(self) -> "_LightOptionsGroup":
        return _LightOptionsGroup()

    """For light layers, the type of light."""

    @property
    def lightType(self) -> LightType:
        return LightType()


class MarkerValue:
    def __init__(
        self,
        comment: str,
        chapter: str = "",
        url: str = "",
        frameTarget: str = "",
        cuePointName: str = "",
        params: str = "",
    ):
        self.comment: str = comment
        self.chapter: str = chapter
        self.cuePointName: str = cuePointName
        self.duration: float = 0.0
        self.eventCuePoint: bool = False
        self.url: str = url
        self.frameTarget: str = frameTarget
        self.label: int = 0
        self.protectedRegion: bool = False

    def getParameters(self) -> dict:
        return {}

    def setParameters(self, keyValuePairs: dict) -> None:
        pass


class MaskPropertyGroup(PropertyGroup):
    @property
    def maskMode(self) -> MaskMode:
        return MaskMode.NONE

    @property
    def inverted(self) -> bool:
        return False

    @property
    def rotoBezier(self) -> bool:
        return False

    @property
    def maskMotionBlur(self) -> MaskMotionBlur:
        return MaskMotionBlur.ACCURATE

    @property
    def locked(self) -> bool:
        return False

    @property
    def color(self) -> ThreeDColorValue:
        return ThreeDColorValue()

    @property
    def maskShape(self) -> ShapeProperty:
        return ShapeProperty()

    @property
    def maskPath(self) -> ShapeProperty:
        return ShapeProperty()

    @property
    def maskFeather(self) -> TwoDProperty:
        return TwoDProperty()

    @property
    def maskFeatherFalloff(self) -> MaskFeatherFalloff:
        return MaskFeatherFalloff.GAUSSIAN

    @property
    def maskOpacity(self) -> OneDProperty:
        return OneDProperty()

    @property
    def maskExpansion(self) -> OneDProperty:
        return OneDProperty()


class OMCollection(Collection):
    @property
    def __getitem__(self, index: int) -> OutputModule:
        return OutputModule()


from typing import List, Union


class OutputModule:
    """An OutputModule object of a RenderQueueItem generates a single file or sequence via a render operation,
    and contains attributes and methods relating to the file to be rendered.
    """

    @property
    def name(self) -> str:
        """The user-interface name of the output module."""
        return ""

    @property
    def templates(self) -> List[str]:
        """All templates for the output module"""
        return []

    @property
    def file(self) -> File:
        """The path and name of the file to be rendered."""
        return File()

    @file.setter
    def file(self, value: File) -> None:
        pass

    @property
    def postRenderAction(self) -> PostRenderAction:
        """An action to be taken after rendering."""
        return PostRenderAction.NONE

    @postRenderAction.setter
    def postRenderAction(self, value: PostRenderAction) -> None:
        pass

    @property
    def includeSourceXMP(self) -> bool:
        """When true, writes all source footage XMP metadata to the output file."""
        return False

    def remove(self) -> None:
        """Removes self.output module from the render-queue item’s list."""
        pass

    def saveAsTemplate(self, name: str) -> None:
        """Saves a new output-module template."""
        pass

    def applyTemplate(self, templateName: str) -> None:
        """Applies an output-module template."""
        pass

    def getSetting(self, key: str) -> Union[str, int]:
        return ""

    def getSettings(self, format: GetSettingsFormat = GetSettingsFormat.STRING_DICT) -> dict:
        return {}

    def setSetting(self, key: str, value: Union[str, int]) -> None:
        pass

    def setSettings(self, settings: dict) -> None:
        pass


class PlaceholderSource(FootageSource):
    """The PlaceholderSource object describes the footage source of a placeholder."""

    pass


class Project:
    """The project object represents an After Effects project. Attributes provide access to specific objects within the project,
    such as imported files or footage and compositions, and also to project settings such as the timecode base.
    Methods can import footage, create solids, compositions and folders, and save changes.
    """

    @property
    def file(self) -> Union[File, None]:
        """The file for the currently open project."""
        return File()

    @property
    def rootFolder(self) -> FolderItem:
        """The folder containing all the contents of the project; the equivalent of the Project panel"""
        return FolderItem()

    @property
    def items(self) -> ItemCollection:
        """All items in the project."""
        return ItemCollection()

    @property
    def activeItem(self) -> Union[_ItemClasses, None]:
        """The currently active item."""
        return None

    @property
    def numItems(self) -> int:
        """The total number of items contained in the project."""
        return 0

    @property
    def selection(self) -> List[_ItemClasses]:
        """All items selected in the Project panel."""
        return []

    @property
    def renderQueue(self) -> RenderQueue:
        """The project’s render queue."""
        return RenderQueue()

    @property
    def bitsPerChannel(self) -> int:
        """The color depth of the current project."""
        return 0

    @property
    def transparencyGridThumbnails(self) -> bool:
        """When true, thumbnail views use the transparency checkerboard pattern."""
        return False

    @property
    def displayStartFrame(self) -> int:
        """The frame at which to start numbering when displaying the project."""
        return 0

    @property
    def gpuAccelType(self) -> GpuAccelType:
        """Get or set the current projects GPU Acceleration option."""
        return GpuAccelType.METAL

    @gpuAccelType.setter
    def gpuAccelType(self, value: GpuAccelType) -> None:
        pass

    @property
    def linearBlending(self) -> bool:
        """When true, linear blending is used for the project."""
        return False

    @property
    def xmpPacket(self) -> str:
        """The project’s XMP metadata."""
        return ""

    @property
    def framesCountType(self) -> FramesCountType:
        """The Frame Count menu setting in the Project Settings dialog box."""
        return FramesCountType.TIMECODE

    @property
    def feetFramesFilmType(self) -> FeetFramesFilmType:
        """The Use Feet + Frames menu setting in the Project Settings dialog box."""
        return FeetFramesFilmType.DENOMINATOR

    @property
    def framesUseFeetFrames(self) -> bool:
        """The Use Feet + Frames setting in the Project Settings dialog box."""
        return False

    @property
    def footageTimecodeDisplayStartType(self) -> FootageTimecodeDisplayStartType:
        """The Footage Start Time setting in the Project Settings dialog box,
        which is enabled when Timecode is selected as the time display style.
        """
        return FootageTimecodeDisplayStartType.HEAD

    @property
    def timeDisplayType(self) -> TimeDisplayType:
        """The time display style, corresponding to the Time Display Style section in the Project Settings dialog box."""
        return TimeDisplayType.FRAMETIME

    @property
    def toolType(self) -> ToolType:
        """The active tool in the Tools panel."""
        return ToolType.HAND

    @property
    def workingGamma(self) -> float:
        """The current project’s working gamma value, either 2.2 or 2.4."""
        return 2.2

    @property
    def workingSpace(self) -> str:
        """A string which is the color profile description for the project’s color working space."""
        return ""

    @property
    def linearizeWorkingSpace(self) -> bool:
        """True if Linearize Working Space should be enabled for self.project."""
        return False

    @property
    def compensateForSceneReferredProfiles(self) -> bool:
        """True if Compensate for Scene-referred Profiles should be enabled for self.project."""
        return False

    @property
    def expressionEngine(self) -> str:
        """The Expressions Engine setting in the Project Settings dialog box."""
        return "extendscript"

    @property
    def item(self, index: int) -> _ItemClasses:
        """Retrieves an item from the project."""
        return _ItemClasses()

    def itemById(self, id: int) -> _ItemClasses:
        """Retrieves an item by its Item ID"""
        return _ItemClasses()

    def consolidateFootage(self) -> int:
        """Consolidates all footage in the project."""
        return 0

    def removeUnusedFootage(self) -> int:
        """Removes unused footage from the project."""
        return 0

    def reduceProject(self, array_of_items: List[_ItemClasses]) -> int:
        """Reduces the project to a specified set of items."""
        return 0

    def close(self, closeOptions: CloseOptions) -> bool:
        """Closes the project with normal save options."""
        return True

    def save(self, file: Union[File, None] = None) -> None:
        """Saves the project."""
        pass

    def saveWithDialog(self) -> bool:
        """Displays a Save dialog box."""
        return True

    def importPlaceholder(
        self, name: str, width: int, height: int, frameRate: float, duration: float
    ) -> PlaceholderItem:
        """Imports a placeholder into the project."""
        return PlaceholderItem()

    def importFile(self, importOptions: ImportOptions) -> _ItemClasses:
        """Imports a file into the project."""
        return _ItemClasses()

    def importFileWithDialog(self) -> Union[List[_ItemClasses], None]:
        """Displays an Import File dialog box."""
        return []

    def showWindow(self, doShow: bool) -> None:
        """Shows or hides the Project panel."""
        pass

    def autoFixExpressions(self, oldText: str, newText: str) -> None:
        """Automatically replaces text in all expressions."""
        pass

    def newTeamProject(self, teamProjectName: str, description: str) -> bool:
        """Creates a new team project."""
        return True

    def openTeamProject(self, teamProjectName: str) -> bool:
        """Opens a team project."""
        return True

    def shareTeamProject(self, comment: str) -> bool:
        """Shares the currently open team project."""
        return True

    def syncTeamProject(self) -> bool:
        """Syncs the currently open team project."""
        return True

    def closeTeamProject(self) -> bool:
        """Closes a currently open team project."""
        return True

    def convertTeamProjectToProject(self, project_file: File) -> bool:
        """Converts a team project to an After Effects project on a local disk."""
        return True

    def listTeamProjects(self) -> List[str]:
        """Returns an array containing the name strings for all team projects available for the current user.
        Archived Team Projects are not included.
        """
        return []

    def isTeamProjectOpen(self, teamProjectName: str) -> bool:
        """Checks whether specified team project is currently open."""
        return True

    def isAnyTeamProjectOpen(self) -> bool:
        """Checks whether any team project is currently open."""
        return True

    def isTeamProjectEnabled(self) -> bool:
        """Checks whether or not team projects is enabled for After Effects. (self.will almost always return true.)"""
        return True

    def isLoggedInToTeamProject(self) -> bool:
        """Checks whether or not the client (After Effects) is currently logged into the team project server."""
        return True

    def isSyncCommandEnabled(self) -> bool:
        """Checks whether or not the Sync command is enabled."""
        return True

    def isShareCommandEnabled(self) -> bool:
        """Checks whether or not the Share command is enabled."""
        return True

    def isResolveCommandEnabled(self) -> bool:
        """Checks whether or not the Resolve command is enabled."""
        return True

    def resolveConflict(self, ResolveType: ResolveType) -> bool:
        """Resolves a conflict between the open team project and the version on the team projects server,
        using the specified resolution method.
        """
        return True

    def listColorProfiles(self) -> List[str]:
        """Returns an array of color profile descriptions that can be set as the project’s color working space."""
        return []

    def setDefaultImportFolder(self, folder: Folder) -> bool:
        """Sets the folder that will be shown in the file import dialog."""
        return True


PropertyClassMembers = {P: Property[P] for P in Property}


class UnknownPropertyType(PropertyClassMembers):
    propertyValueType: PropertyValueType
    value: any


class NoValueType(PropertyClassMembers):
    propertyValueType: PropertyValueType.NO_VALUE
    value: any


ColorValue = Tuple[number, number, number, number]
ThreeDColorValue = Tuple[number, number, number]


class ColorType(PropertyClassMembers):
    propertyValueType: PropertyValueType.COLOR
    value: ColorValue


class BooleanType(PropertyClassMembers):
    propertyValueType: PropertyValueType.OneD
    value: bool


class OneDType(PropertyClassMembers):
    propertyValueType: PropertyValueType.OneD
    value: number


class TwoDType(PropertyClassMembers):
    propertyValueType: PropertyValueType.TwoD
    value: Tuple[number, number]


class TwoDSpatialType(PropertyClassMembers):
    propertyValueType: PropertyValueType.TwoD_SPATIAL
    value: Tuple[number, number]


class ThreeDType(PropertyClassMembers):
    propertyValueType: PropertyValueType.ThreeD
    value: Tuple[number, number, number]


class TextDocumentType(PropertyClassMembers):
    propertyValueType: PropertyValueType.TEXT_DOCUMENT
    value: TextDocument


class MarkerValueType(PropertyClassMembers):
    propertyValueType: PropertyValueType.MARKER
    value: MarkerValue


class ShapePropertyType(PropertyClassMembers):
    propertyValueType: PropertyValueType.SHAPE
    value: Shape


NoValueProperty = Property[NoValueType]
ColorProperty = Property[ColorType]
OneDProperty = Property[OneDType]
TwoDProperty = Property[TwoDType]
ThreeDProperty = Property[ThreeDType]
ShapeProperty = Property[ShapePropertyType]
MarkerValueProperty = Property[MarkerValueType]
TextDocumentProperty = Property[TextDocumentType]

AnyProperty = Union[
    NoValueProperty, ColorProperty, OneDProperty, ShapeProperty, MarkerValueProperty, TextDocumentProperty
]


class Property("PropertyBase"):
    """The Property object contains value, keyframe, and expression information about a particular AE property of a layer."""

    def __init__(self):
        super().__init__()

    @property
    def propertyValueType(self) -> str:
        """Type of value stored in self.property."""
        return self._propertyValueType

    @property
    def value(self) -> Union[int, float, str, List[Union[int, float]]]:
        """Current value of the property."""
        return self._value

    @property
    def hasMin(self) -> bool:
        """When true, there is a minimum permitted value."""
        return self._hasMin

    @property
    def hasMax(self) -> bool:
        """When true, there is a maximum permitted value."""
        return self._hasMax

    @property
    def minValue(self) -> float:
        """The minimum permitted value."""
        return self._minValue

    @property
    def maxValue(self) -> float:
        """The maximum permitted value."""
        return self._maxValue

    @property
    def isSpatial(self) -> bool:
        """When true, the property defines a spatial value."""
        return self._isSpatial

    @property
    def canVaryOverTime(self) -> bool:
        """When true, the property can be keyframed."""
        return self._canVaryOverTime

    @property
    def canSetExpression(self) -> bool:
        """When true, the expression can be set by a script."""
        return self._canSetExpression

    @property
    def isTimeVarying(self) -> bool:
        """When true, the property has keyframes or an expression enabled that can vary its values."""
        return self._isTimeVarying

    @property
    def numKeys(self) -> int:
        """The number of keyframes on self.property."""
        return self._numKeys

    @property
    def unitsText(self) -> str:
        """A text description of the units in which the value is expressed."""
        return self._unitsText

    @property
    def expressionError(self) -> str:
        """The error, if any, that occurred when the last expression was evaluated."""
        return self._expressionError

    @property
    def selectedKeys(self) -> List[int]:
        """All selected keyframes of the property."""
        return self._selectedKeys

    @property
    def propertyIndex(self) -> int:
        """The position index of self.property."""
        return self._propertyIndex

    @property
    def isSeparationFollower(self) -> bool:
        """When true, the property represents one of the separated dimensions for a multidimensional property."""
        return self._isSeparationFollower

    @property
    def isSeparationLeader(self) -> bool:
        """When true, the property is multidimensional and can be separated."""
        return self._isSeparationLeader

    @property
    def separationDimension(self) -> int:
        """For a separated follower, the dimension it represents in the multidimensional leader."""
        return self._separationDimension

    @property
    def separationLeader(self) -> Property[Union[TwoDProperty, ThreeDProperty]]:
        """The original multidimensional property for self.separated follower."""
        return self._separationLeader

    @property
    def isDropdownEffect(self) -> bool:
        """When true, the property is the Menu property of a Dropdown Menu Control effect."""
        return self._isDropdownEffect

    @property
    def alternateSource(self) -> AVItem:
        """The alternate render source for Media Replacement."""
        return self._alternateSource

    @property
    def canSetAlternateSource(self) -> bool:
        """True if the property allows Media Replacement."""
        return self._canSetAlternateSource

    @property
    def expression(self) -> str:
        """The expression string for self.property."""
        return self._expression

    @property
    def expressionEnabled(self) -> bool:
        """When true, the expression is used to generate values for the property."""
        return self._expressionEnabled

    @property
    def dimensionsSeparated(self) -> bool:
        """When true, the property’s dimensions are represented as separate properties."""
        return self._dimensionsSeparated

    def valueAtTime(self, time: float, preExpression: bool) -> Union[int, float, str, List[Union[int, float]]]:
        """Gets the value of the property evaluated at given time."""
        return self._valueAtTime(time, preExpression)

    def setValue(self, newValue: Union[int, float, str, List[Union[int, float]]]) -> None:
        """Sets the static value of the property."""
        self._setValue(newValue)

    def setValueAtTime(self, time: float, newValue: Union[int, float, str, List[Union[int, float]]]) -> None:
        """Creates a keyframe for the property."""
        self._setValueAtTime(time, newValue)

    def setValuesAtTimes(
        self, times: List[float], newValues: List[Union[int, float, str, List[Union[int, float]]]]
    ) -> None:
        """Creates a set of keyframes for the property."""
        self._setValuesAtTimes(times, newValues)

    def setValueAtKey(self, keyIndex: int, newValue: Union[int, float, str, List[Union[int, float]]]) -> None:
        """Finds a keyframe and sets the value of the property at that keyframe."""
        self._setValueAtKey(keyIndex, newValue)

    def nearestKeyIndex(self, time: float) -> int:
        """Gets the keyframe nearest to a specified time."""
        return self._nearestKeyIndex(time)

    def keyTime(self, keyIndex: int) -> float:
        """Gets the time at which a condition occurs."""
        return self._keyTime(keyIndex)

    def keyTime(self, markerComment: str) -> float:
        """Gets the time at which a condition occurs."""
        return self._keyTime(markerComment)

    def keyValue(self, keyIndex: int) -> Union[int, float, str, List[Union[int, float]]]:
        """Gets the value of a keyframe at the time at which a condition occurs."""
        return self._keyValue(keyIndex)

    def keyValue(self, markerComment: str) -> MarkerValue:
        """Gets the value of a keyframe at the time at which a condition occurs."""
        return self._keyValue(markerComment)

    def addKey(self, time: float) -> int:
        """Adds a new keyframe to the property at a given time."""
        return self._addKey(time)

    def removeKey(self, keyIndex: int) -> None:
        """Removes a keyframe from the property."""
        self._removeKey(keyIndex)

    def isInterpolationTypeValid(self, type: KeyframeInterpolationType) -> bool:
        """When true, self.property can be interpolated."""
        return self._isInterpolationTypeValid(type)

    def setInterpolationTypeAtKey(
        self, keyIndex: int, inType: KeyframeInterpolationType, outType: KeyframeInterpolationType = None
    ) -> None:
        """Sets the interpolation type for a key."""
        self._setInterpolationTypeAtKey(keyIndex, inType, outType)

    def keyInInterpolationType(self, keyIndex: int) -> KeyframeInterpolationType:
        """Gets the 'in' interpolation type for a key."""
        return self._keyInInterpolationType(keyIndex)

    def keyOutInterpolationType(self, keyIndex: int) -> KeyframeInterpolationType:
        """Gets the 'out' interpolation type for a key."""
        return self._keyOutInterpolationType(keyIndex)

    def setSpatialTangentsAtKey(self, keyIndex: int, inTangent: List[float], outTangent: List[float]) -> None:
        """Sets the 'in' and 'out' tangent vectors for a key."""
        self._setSpatialTangentsAtKey(keyIndex, inTangent, outTangent)

    def keyInSpatialTangent(self, keyIndex: int) -> List[float]:
        """Gets the 'in' spatial tangent for a key."""
        return self._keyInSpatialTangent(keyIndex)

    def keyOutSpatialTangent(self, keyIndex: int) -> List[float]:
        """Gets the 'out' spatial tangent for a key."""
        return self._keyOutSpatialTangent(keyIndex)

    def setTemporalEaseAtKey(
        self, keyIndex: int, inTemporalEase: List[KeyframeEase], outTemporalEase: List[KeyframeEase] = None
    ) -> None:
        """Sets the 'in' and 'out' temporal ease for a key."""
        self._setTemporalEaseAtKey(keyIndex, inTemporalEase, outTemporalEase)

    def keyInTemporalEase(self, keyIndex: int) -> List[KeyframeEase]:
        """Gets the 'in' temporal ease for a key."""
        return self._keyInTemporalEase(keyIndex)

    def keyOutTemporalEase(self, keyIndex: int) -> List[KeyframeEase]:
        """Gets the 'out' temporal ease for a key."""
        return self._keyOutTemporalEase(keyIndex)

    def setTemporalContinuousAtKey(self, keyIndex: int, newVal: bool) -> None:
        """Sets whether a keyframe has temporal continuity."""
        self._setTemporalContinuousAtKey(keyIndex, newVal)

    def keyTemporalContinuous(self, keyIndex: int) -> bool:
        """Reports whether a keyframe has temporal continuity."""
        return self._keyTemporalContinuous(keyIndex)

    def setTemporalAutoBezierAtKey(self, keyIndex: int, newVal: bool) -> None:
        """Sets whether a keyframe has temporal auto-Bezier."""
        self._setTemporalAutoBezierAtKey(keyIndex, newVal)

    def keyTemporalAutoBezier(self, keyIndex: int) -> bool:
        """Reports whether a keyframe has temporal auto-Bezier."""
        return self._keyTemporalAutoBezier(keyIndex)

    def setSpatialContinuousAtKey(self, keyIndex: int, newVal: bool) -> None:
        """Sets whether a keyframe has spatial continuity."""
        self._setSpatialContinuousAtKey(keyIndex, newVal)

    def keySpatialContinuous(self, keyIndex: int) -> bool:
        """Reports whether a keyframe has spatial continuity."""
        return self._keySpatialContinuous(keyIndex)

    def setSpatialAutoBezierAtKey(self, keyIndex: int, newVal: bool) -> None:
        """Sets whether a keyframe has spatial auto-Bezier."""
        self._setSpatialAutoBezierAtKey(keyIndex, newVal)

    def keySpatialAutoBezier(self, keyIndex: int) -> bool:
        """Reports whether a keyframe has spatial auto-Bezier."""
        return self._keySpatialAutoBezier(keyIndex)

    def setRovingAtKey(self, keyIndex: int, newVal: bool) -> None:
        """Sets whether a keyframe is roving."""
        self._setRovingAtKey(keyIndex, newVal)

    def keyRoving(self, keyIndex: int) -> bool:
        """Reports whether a keyframe is roving."""
        return self._keyRoving(keyIndex)

    def setSelectedAtKey(self, keyIndex: int, onOff: bool) -> None:
        """Sets whether a keyframe is selected."""
        self._setSelectedAtKey(keyIndex, onOff)

    def keySelected(self, keyIndex: int) -> bool:
        """Reports whether a keyframe is selected."""
        return self._keySelected(keyIndex)

    def getSeparationFollower(self, dim: int) -> Property[OneDProperty]:
        """For a separated, multidimensional property, retrieves a specific follower property."""
        return self._getSeparationFollower(dim)

    def addToMotionGraphicsTemplate(self, comp: CompItem) -> bool:
        """Adds the property to the Essential Graphics panel for the specified composition."""
        return self._addToMotionGraphicsTemplate(comp)

    def addToMotionGraphicsTemplateAs(self, comp: CompItem, name: str) -> bool:
        """Adds the property to the Essential Graphics panel for the specified composition, providing a name."""
        return self._addToMotionGraphicsTemplateAs(comp, name)

    def canAddToMotionGraphicsTemplate(self, comp: CompItem) -> bool:
        """Test whether or not the property can be added to the Essential Graphics panel for the specified composition."""
        return self._canAddToMotionGraphicsTemplate(comp)

    def setPropertyParameters(self, items: List[str]) -> None:
        """Sets parameters for a Dropdown Menu Control’s Menu Property."""
        self._setPropertyParameters(items)

    def setAlternateSource(self, newSource: AVItem) -> None:
        """Set the alternate source for self.property."""
        self._setAlternateSource(newSource)


class PropertyBase:
    """Base class for AE properties."""

    @property
    def matchName(self) -> str:
        """A special name for the property used to build unique naming paths."""
        return self._matchName

    @property
    def propertyIndex(self) -> int:
        """Index of self.property within its parent group."""
        return self._propertyIndex

    @property
    def propertyDepth(self) -> int:
        """The number of levels of parent groups between self.property and the containing layer."""
        return self._propertyDepth

    @property
    def propertyType(self) -> PropertyType:
        """The property type."""
        return self._propertyType

    @property
    def parentProperty(self) -> PropertyGroup:
        """The immediate parent group of self.property."""
        return self._parentProperty

    @property
    def isModified(self) -> bool:
        """When true, the property has been changed since its creation."""
        return self._isModified

    @property
    def canSetEnabled(self) -> bool:
        """When true, the user interface displays an eyeball icon for self.property."""
        return self._canSetEnabled

    @property
    def active(self) -> bool:
        """When true, self.property is active."""
        return self._active

    @property
    def elided(self) -> bool:
        """When true, self.property is not displayed in the user interface."""
        return self._elided

    @property
    def isEffect(self) -> bool:
        """When true, self.property is an effect."""
        return self._isEffect

    @property
    def isMask(self) -> bool:
        """When true, self.property is a mask."""
        return self._isMask

    @property
    def name(self) -> str:
        """Name of the property."""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        self._name = value

    @property
    def enabled(self) -> bool:
        """When true, self.property is enabled."""
        return self._enabled

    @enabled.setter
    def enabled(self, value: bool) -> None:
        self._enabled = value

    @property
    def selected(self) -> bool:
        """When true, self.property is selected."""
        return self._selected

    @selected.setter
    def selected(self, value: bool) -> None:
        self._selected = value

    @property
    def propertyGroup(self, countUp: int = 1) -> PropertyGroup:
        """Gets the parent group for self.property."""
        return self._propertyGroup(countUp)

    def remove(self) -> None:
        """Removes self.from the project."""
        self._remove()

    def moveTo(self, newIndex: int) -> None:
        """Moves self.property to a new position in its parent group."""
        self._moveTo(newIndex)

    def duplicate(self) -> _PropertyClasses:
        """Duplicates self.property object."""
        return self._duplicate()

    def property(self, index: Union[int, str]) -> _PropertyClasses:
        """Gets a member property or group."""
        return self._property(index)


class PropertyGroup(PropertyBase):
    """Represents a group of properties."""

    @property
    def numProperties(self) -> int:
        """The number of indexed properties in the group."""
        return self._numProperties

    def canAddProperty(self, name: str) -> bool:
        """Reports whether a property can be added to the group."""
        return self._canAddProperty(name)

    def addProperty(self, name: str) -> _PropertyClasses:
        """Adds a property to the group."""
        return self._addProperty(name)


class RenderQueue:
    """Represents the render automation process in After Effects."""

    @property
    def rendering(self) -> bool:
        """When true, a render is in progress."""
        return self._rendering

    @property
    def numItems(self) -> int:
        """The total number of items in the render queue."""
        return self._numItems

    @property
    def canQueueInAME(self) -> bool:
        """CC 2017(14.0)-"""
        return self._canQueueInAME

    @property
    def items(self) -> RQItemCollection:
        """The collection of items in the render queue."""
        return self._items

    def showWindow(self, doShow: bool) -> None:
        """Show or hide the Render Queue panel."""
        self._showWindow(doShow)

    def render(self) -> None:
        """Starts the rendering process; does not return until render is complete."""
        self._render()

    def pauseRendering(self, pause: bool) -> None:
        """Pauses or restarts the rendering process."""
        self._pauseRendering(pause)

    def queueInAME(self, render_immediately_in_AME: bool) -> None:
        """Calls the Queue In AME command."""
        self._queueInAME(render_immediately_in_AME)

    def stopRendering(self) -> None:
        """Stops the rendering process."""
        self._stopRendering()

    def item(self, index: int) -> RenderQueueItem:
        """Gets a render-queue item from the collection."""
        return self._item(index)


class RenderQueueItem:
    """Represents an individual item in the render queue."""

    @property
    def numOutputModules(self) -> int:
        """The total number of Output Modules assigned to the item."""
        return self._numOutputModules

    @property
    def startTime(self) -> Union[None, Date]:
        """The time when rendering began for the item."""
        return self._startTime

    @property
    def elapsedSeconds(self) -> Union[None, float]:
        """The time elapsed in the current rendering of self.item."""
        return self._elapsedSeconds

    @property
    def comp(self) -> CompItem:
        """The composition to be rendered by self.item."""
        return self._comp

    @property
    def outputModules(self) -> OMCollection:
        """The collection of Output Modules for self.item."""
        return self._outputModules

    @property
    def templates(self) -> List[str]:
        """A set of Render Settings templates."""
        return self._templates

    @property
    def status(self) -> RQItemStatus:
        """The current rendering status of the item."""
        return self._status

    @property
    def render(self) -> bool:
        """When true, self.item is rendered when the queue is started."""
        return self._render

    @render.setter
    def render(self, value: bool) -> None:
        self._render = value

    @property
    def timeSpanStart(self) -> float:
        """The start time in the composition to be rendered."""
        return self._timeSpanStart

    @timeSpanStart.setter
    def timeSpanStart(self, value: float) -> None:
        self._timeSpanStart = value

    @property
    def timeSpanDuration(self) -> float:
        """The duration of the composition to be rendered."""
        return self._timeSpanDuration

    @timeSpanDuration.setter
    def timeSpanDuration(self, value: float) -> None:
        self._timeSpanDuration = value

    @property
    def skipFrames(self) -> int:
        """The number of frames to skip when rendering self.item."""
        return self._skipFrames

    @skipFrames.setter
    def skipFrames(self, value: int) -> None:
        self._skipFrames = value

    @property
    def onStatus(self) -> Union[None, str]:
        """A callback function that is called during the rendering process when the status of the item changes."""
        return self._onStatus

    @onStatus.setter
    def onStatus(self, value: Union[None, str]) -> None:
        self._onStatus = value

    @property
    def logType(self) -> LogType:
        """A log type for self.item."""
        return self._logType

    def getSetting(self, key: str) -> Union[str, int]:
        """Gets a specific setting for the item."""
        return self._getSetting(key)

    def getSettings(self, format: GetSettingsFormat) -> object:
        """Gets all settings for the item."""
        return self._getSettings(format)

    def setSetting(self, key: str, value: Union[str, int]) -> None:
        """Sets a specific setting for the item."""
        self._setSetting(key, value)

    def setSettings(self, settings: object) -> None:
        """Sets multiple settings for the item."""
        self._setSettings(settings)

    def outputModule(self, index: int) -> OutputModule:
        """Gets an Output Module for the item."""
        return self._outputModule(index)

    def remove(self) -> None:
        """Removes the item from the render queue."""
        self._remove()

    def saveAsTemplate(self, name: str) -> None:
        """Saves a new Render Settings template."""
        self._saveAsTemplate(name)

    def applyTemplate(self, templateName: str) -> None:
        """Applies a Render Settings template."""
        self._applyTemplate(templateName)

    def duplicate(self) -> RenderQueueItem:
        """Duplicates self.item."""
        return self._duplicate()


class RQItemCollection(Collection):
    """Contains all render-queue items in a project."""

    def add(self, comp: CompItem) -> RenderQueueItem:
        """Adds a composition to the Render Queue."""
        return RenderQueueItem()


class Settings:
    """Provides an easy way to manage settings for scripts."""

    def saveSetting(self, sectionName: str, keyName: str, value: str, type: PREFType = None) -> None:
        """Saves a default value for a setting."""
        self._saveSetting(sectionName, keyName, value, type)

    def getSetting(self, sectionName: str, keyName: str, type: PREFType = None) -> str:
        """Retrieves a setting value."""
        return self._getSetting(sectionName, keyName, type)

    def haveSetting(self, sectionName: str, keyName: str, type: PREFType = None) -> bool:
        """Reports whether a specified setting is assigned."""
        return self._haveSetting(sectionName, keyName, type)


class Shape:
    """Encapsulates information describing a shape in a shape layer or the outline shape of a mask."""

    closed: bool
    vertices: List[Tuple[float, float]]
    inTangents: List[Tuple[float, float]]
    outTangents: List[Tuple[float, float]]
    featherSegLocs: List[float]
    featherRelSegLocs: List[float]
    featherRadii: List[float]
    featherInterps: List[float]
    featherTensions: List[float]
    featherTypes: List[float]
    featherRelCornerAngles: List[float]


class ShapeLayer(AVLayer):
    """Represents a shape layer within a composition."""

    pass


class SolidSource(FootageSource):
    """Represents a solid-color footage source."""

    color: ThreeDColorValue


class _Swatch:
    """File specification, an ExtendScript File object."""

    majorVersion: int
    minorVersion: int
    values: List[_SwatchValue]


class _SwatchValue:
    """Swatch value."""

    type: str  # "RGB", "CMYK", "LAB", "Gray"
    r: float
    g: float
    b: float
    c: float
    m: float
    y: float
    k: float
    L: float
    a: float
    gray: float
    value: float


class System:
    """Provides access to attributes found on the user’s system."""

    userName: str
    machineName: str
    osName: str
    osVersion: str

    def callSystem(self, cmdLineToExecute: str) -> str:
        """Executes a command on the system’s command line."""
        return self._callSystem(cmdLineToExecute)


class TextDocument:
    """Stores a value for a TextLayer's Source Text property."""

    def __init__(self, docText: str):
        """Constructor, passing the string to be encapsulated."""
        self._docText = docText

    @property
    def pointText(self) -> bool:
        """When true, the text layer is point (unbounded) text."""
        return self._pointText

    @property
    def boxText(self) -> bool:
        """When true, the text layer is paragraph (bounded) text."""
        return self._boxText

    @property
    def fontLocation(self) -> str:
        """Path of font file, providing its location on disk."""
        return self._fontLocation

    @property
    def fontStyle(self) -> str:
        """Style information — e.g., “bold”, “italic”."""
        return self._fontStyle

    @property
    def fontFamily(self) -> str:
        """The name of the font family."""
        return self._fontFamily

    @property
    def fauxBold(self) -> bool:
        """True if a text layer has faux bold enabled."""
        return self._fauxBold

    @property
    def fauxItalic(self) -> bool:
        """True if a text layer has faux italic enabled."""
        return self._fauxItalic

    @property
    def allCaps(self) -> bool:
        """True if a text layer has all caps enabled."""
        return self._allCaps

    @property
    def smallCaps(self) -> bool:
        """True if a text layer has small caps enabled."""
        return self._smallCaps

    @property
    def superscript(self) -> bool:
        """True if a text layer has superscript enabled."""
        return self._superscript

    @property
    def subscript(self) -> bool:
        """True if a text layer has subscript enabled."""
        return self._subscript

    @property
    def verticalScale(self) -> float:
        """self.text layer’s vertical scale in pixels."""
        return self._verticalScale

    @property
    def horizontalScale(self) -> float:
        """self.text layer’s horizontal scale in pixels."""
        return self._horizontalScale

    @property
    def baselineShift(self) -> float:
        """self.text layer’s baseline shift in pixels."""
        return self._baselineShift

    @property
    def tsume(self) -> float:
        """self.text layer’s tsume value."""
        return self._tsume

    @property
    def boxTextPos(self) -> Tuple[float, float]:
        """The layer coordinates from a paragraph (box) text layer’s anchor point as a [width, height] array of pixel dimensions."""
        return self._boxTextPos

    @property
    def baselineLocs(self) -> List[float]:
        """The baseline (x,y) locations for a text layer."""
        return self._baselineLocs

    @property
    def text(self) -> str:
        """The text layer’s Source Text value."""
        return self._text

    @text.setter
    def text(self, value: str) -> None:
        self._text = value

    @property
    def applyFill(self) -> bool:
        """When true, the text layer shows a fill."""
        return self._applyFill

    @property
    def applyStroke(self) -> bool:
        """When true, the text layer shows a stroke."""
        return self._applyStroke

    @property
    def fillColor(self) -> ThreeDColorValue:
        """The text layer’s fill color."""
        return self._fillColor

    @property
    def font(self) -> str:
        """The text layer’s font specified by its PostScript name."""
        return self._font

    @property
    def fontSize(self) -> float:
        """The text layer’s font size in pixels."""
        return self._fontSize

    @property
    def justification(self) -> ParagraphJustification:
        """The paragraph justification for the text layer."""
        return self._justification

    @property
    def leading(self) -> float:
        """The text layer’s spacing between lines."""
        return self._leading

    @property
    def strokeColor(self) -> ThreeDColorValue:
        """The text layer’s stroke color."""
        return self._strokeColor

    @property
    def strokeOverFill(self) -> bool:
        """Indicates the rendering order for the fill and stroke of a text layer."""
        return self._strokeOverFill

    @property
    def strokeWidth(self) -> float:
        """The text layer’s stroke thickness."""
        return self._strokeWidth

    @property
    def tracking(self) -> float:
        """The text layer’s spacing between characters."""
        return self._tracking

    @property
    def boxTextSize(self) -> Tuple[float, float]:
        """For box text, the pixel dimensions for the text bounds."""
        return self._boxTextSize

    def resetCharStyle(self) -> None:
        """Restores the default character settings in the Character panel."""
        self._resetCharStyle()

    def resetParagraphStyle(self) -> None:
        """Restores the default paragraph settings in the Paragraph panel."""
        self._resetParagraphStyle()


class TextLayer(AVLayer):
    """Represents a text layer within a composition."""

    source: None
    text: _TextProperties
    sourceText: TextDocumentProperty


class View:
    """Represents a view."""

    active: bool
    options: ViewOptions

    def setActive(self) -> None:
        """Sets the view as active."""
        self._setActive()


class Viewer:
    """Represents a Composition, Layer, or Footage panel."""

    def __init__(self):
        """Constructor."""
        self._type: ViewerType
        self._active: bool
        self._views: List[View]
        self._activeViewIndex: int
        self._guidesLocked: bool
        self._guidesSnap: bool
        self._guidesVisibility: bool
        self._rulers: bool
        self._maximized: bool

    @property
    def type(self) -> ViewerType:
        """The type of content in the viewer."""
        return self._type

    @property
    def active(self) -> bool:
        """When true, the viewer is focused."""
        return self._active

    @property
    def views(self) -> List[View]:
        return self._views

    @property
    def activeViewIndex(self) -> int:
        return self._activeViewIndex

    @property
    def guidesLocked(self) -> bool:
        """When true, indicates guides are locked in the viewer."""
        return self._guidesLocked

    @property
    def guidesSnap(self) -> bool:
        """When true, indicates layers snap to guides when dragged in the viewer."""
        return self._guidesSnap

    @property
    def guidesVisibility(self) -> bool:
        """When true, indicates guides are visible in the viewer."""
        return self._guidesVisibility

    @property
    def rulers(self) -> bool:
        """When true, indicates rulers are shown in the viewer."""
        return self._rulers

    @property
    def maximized(self) -> bool:
        """When true, the viewer is at its maximized size."""
        return self._maximized

    def setActive(self) -> bool:
        """Moves the viewer to front and places focus on it."""
        return self._setActive()


class ViewOptions:
    """Represents view options."""

    channels: ChannelType
    checkerboards: bool
    exposure: float
    fastPreview: FastPreviewType
    zoom: float
    guidesLocked: bool
    guidesSnap: bool
    guidesVisibility: bool
    rulers: bool


class _TransformGroup(PropertyGroup):
    """Properties for Transform Group."""

    anchorPoint: TwoDProperty | ThreeDProperty
    position: TwoDProperty | ThreeDProperty
    xPosition: OneDProperty
    yPosition: OneDProperty
    zPosition: OneDProperty
    scale: TwoDProperty | ThreeDProperty
    orientation: ThreeDProperty
    rotation: OneDProperty
    xRotation: OneDProperty
    yRotation: OneDProperty
    zRotation: OneDProperty
    opacity: OneDProperty
    pointOfInterest: ThreeDProperty


class _LightOptionsGroup(PropertyGroup):
    """Properties for Light Options Group."""

    intensity: OneDProperty
    color: ColorProperty
    coneAngle: OneDProperty
    coneFeather: OneDProperty
    falloff: OneDProperty
    radius: OneDProperty
    falloffDistance: OneDProperty
    castsShadows: OneDProperty
    shadowDarkness: OneDProperty
    shadowDiffusion: OneDProperty


from typing import List, Tuple


class _CameraOptionsGroup(PropertyGroup):
    """Properties for Camera Options Group."""

    @property
    def zoom(self) -> OneDProperty:
        return self._get_property("zoom")

    @property
    def depthOfField(self) -> OneDProperty:
        return self._get_property("depthOfField")

    @property
    def focusDistance(self) -> OneDProperty:
        return self._get_property("focusDistance")

    @property
    def aperture(self) -> OneDProperty:
        return self._get_property("aperture")

    @property
    def blurLevel(self) -> OneDProperty:
        return self._get_property("blurLevel")

    @property
    def irisShape(self) -> OneDProperty:
        return self._get_property("irisShape")

    @property
    def irisRotation(self) -> OneDProperty:
        return self._get_property("irisRotation")

    @property
    def irisRoundness(self) -> OneDProperty:
        return self._get_property("irisRoundness")

    @property
    def irisAspectRatio(self) -> OneDProperty:
        return self._get_property("irisAspectRatio")

    @property
    def irisDiffractionFringe(self) -> OneDProperty:
        return self._get_property("irisDiffractionFringe")

    @property
    def highlightGain(self) -> OneDProperty:
        return self._get_property("highlightGain")

    @property
    def highlightThreshold(self) -> OneDProperty:
        return self._get_property("highlightThreshold")

    @property
    def highlightSaturation(self) -> OneDProperty:
        return self._get_property("highlightSaturation")


class _LayerStyles(PropertyGroup):
    """Properties for Layer Styles."""

    @property
    def blendingOption(self) -> _BlendOptionsGroup:
        return self._get_property("blendingOption")

    @property
    def dropShadow(self) -> _DropShadow:
        return self._get_property("dropShadow")

    @property
    def innerShadow(self) -> _InnerShadow:
        return self._get_property("innerShadow")

    @property
    def outerGlow(self) -> _OuterGlow:
        return self._get_property("outerGlow")

    @property
    def innerGlow(self) -> _InnerGlow:
        return self._get_property("innerGlow")

    @property
    def bevelAndEmboss(self) -> _BevelAndEmboss:
        return self._get_property("bevelAndEmboss")

    @property
    def satin(self) -> _Satin:
        return self._get_property("satin")

    @property
    def colorOverlay(self) -> _ColorOverlay:
        return self._get_property("colorOverlay")

    @property
    def gradientOverlay(self) -> _GradientOverlay:
        return self._get_property("gradientOverlay")

    @property
    def stroke(self) -> _Stroke:
        return self._get_property("stroke")


class _BlendOptionsGroup(PropertyGroup):
    """Properties for Blend Options Group."""

    @property
    def globalLightAngle(self) -> OneDProperty:
        return self._get_property("globalLightAngle")

    @property
    def globalLightAltitude(self) -> OneDProperty:
        return self._get_property("globalLightAltitude")

    @property
    def advancedBlending(self) -> _AdvBlendGroup:
        return self._get_property("advancedBlending")


class _AdvBlendGroup(PropertyGroup):
    """Properties for Advanced Blend Group."""

    @property
    def fillOpacity(self) -> OneDProperty:
        return self._get_property("fillOpacity")

    @property
    def red(self) -> OneDProperty:
        return self._get_property("red")

    @property
    def green(self) -> OneDProperty:
        return self._get_property("green")

    @property
    def blue(self) -> OneDProperty:
        return self._get_property("blue")

    @property
    def blendInteriorStylesAsGroup(self) -> OneDProperty:
        return self._get_property("blendInteriorStylesAsGroup")

    @property
    def useBlendRangesFromSource(self) -> OneDProperty:
        return self._get_property("useBlendRangesFromSource")


class _DropShadow(PropertyGroup):
    """Properties for Drop Shadow."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def useGlobalLight(self) -> OneDProperty:
        return self._get_property("useGlobalLight")

    @property
    def angle(self) -> OneDProperty:
        return self._get_property("angle")

    @property
    def distance(self) -> OneDProperty:
        return self._get_property("distance")

    @property
    def spread(self) -> OneDProperty:
        return self._get_property("spread")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def noise(self) -> OneDProperty:
        return self._get_property("noise")

    @property
    def layerKnocksOutDropShadow(self) -> OneDProperty:
        return self._get_property("layerKnocksOutDropShadow")


class _InnerShadow(PropertyGroup):
    """Properties for Inner Shadow."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def useGlobalLight(self) -> OneDProperty:
        return self._get_property("useGlobalLight")

    @property
    def angle(self) -> OneDProperty:
        return self._get_property("angle")

    @property
    def distance(self) -> OneDProperty:
        return self._get_property("distance")

    @property
    def choke(self) -> OneDProperty:
        return self._get_property("choke")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def noise(self) -> OneDProperty:
        return self._get_property("noise")


class _OuterGlow(PropertyGroup):
    """Properties for Outer Glow."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def noise(self) -> OneDProperty:
        return self._get_property("noise")

    @property
    def colorType(self) -> OneDProperty:
        return self._get_property("colorType")

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def colors(self) -> NoValueProperty:
        return self._get_property("colors")

    @property
    def gradientSmoothness(self) -> OneDProperty:
        return self._get_property("gradientSmoothness")

    @property
    def technique(self) -> OneDProperty:
        return self._get_property("technique")

    @property
    def spread(self) -> OneDProperty:
        return self._get_property("spread")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def range(self) -> OneDProperty:
        return self._get_property("range")

    @property
    def jitter(self) -> OneDProperty:
        return self._get_property("jitter")


class _InnerGlow(PropertyGroup):
    """Properties for Inner Glow."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def noise(self) -> OneDProperty:
        return self._get_property("noise")

    @property
    def colorType(self) -> OneDProperty:
        return self._get_property("colorType")

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def colors(self) -> NoValueProperty:
        return self._get_property("colors")

    @property
    def gradientSmoothness(self) -> OneDProperty:
        return self._get_property("gradientSmoothness")

    @property
    def technique(self) -> OneDProperty:
        return self._get_property("technique")

    @property
    def source(self) -> OneDProperty:
        return self._get_property("source")

    @property
    def choke(self) -> OneDProperty:
        return self._get_property("choke")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def range(self) -> OneDProperty:
        return self._get_property("range")

    @property
    def jitter(self) -> OneDProperty:
        return self._get_property("jitter")


class _BevelAndEmboss(PropertyGroup):
    """Properties for Bevel and Emboss."""

    @property
    def style(self) -> OneDProperty:
        return self._get_property("style")

    @property
    def technique(self) -> OneDProperty:
        return self._get_property("technique")

    @property
    def depth(self) -> OneDProperty:
        return self._get_property("depth")

    @property
    def direction(self) -> OneDProperty:
        return self._get_property("direction")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def soften(self) -> OneDProperty:
        return self._get_property("soften")

    @property
    def useGlobalLight(self) -> OneDProperty:
        return self._get_property("useGlobalLight")

    @property
    def angle(self) -> OneDProperty:
        return self._get_property("angle")

    @property
    def altitude(self) -> OneDProperty:
        return self._get_property("altitude")

    @property
    def highlightMode(self) -> OneDProperty:
        return self._get_property("highlightMode")

    @property
    def highlightColor(self) -> ColorProperty:
        return self._get_property("highlightColor")

    @property
    def highlightOpacity(self) -> OneDProperty:
        return self._get_property("highlightOpacity")

    @property
    def shadowMode(self) -> OneDProperty:
        return self._get_property("shadowMode")

    @property
    def shadowColor(self) -> ColorProperty:
        return self._get_property("shadowColor")

    @property
    def shadowOpacity(self) -> OneDProperty:
        return self._get_property("shadowOpacity")


class _Satin(PropertyGroup):
    """Properties for Satin."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def angle(self) -> OneDProperty:
        return self._get_property("angle")

    @property
    def distance(self) -> OneDProperty:
        return self._get_property("distance")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def invert(self) -> OneDProperty:
        return self._get_property("invert")


class _ColorOverlay(PropertyGroup):
    """Properties for Color Overlay."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")


class _GradientOverlay(PropertyGroup):
    """Properties for Gradient Overlay."""

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def colors(self) -> NoValueProperty:
        return self._get_property("colors")

    @property
    def gradientSmoothness(self) -> OneDProperty:
        return self._get_property("gradientSmoothness")

    @property
    def angle(self) -> OneDProperty:
        return self._get_property("angle")

    @property
    def style(self) -> OneDProperty:
        return self._get_property("style")

    @property
    def reverse(self) -> OneDProperty:
        return self._get_property("reverse")

    @property
    def alignWithLayer(self) -> OneDProperty:
        return self._get_property("alignWithLayer")

    @property
    def scale(self) -> OneDProperty:
        return self._get_property("scale")

    @property
    def offset(self) -> TwoDProperty:
        return self._get_property("offset")


class _Stroke(PropertyGroup):
    """Properties for Stroke."""

    @property
    def color(self) -> ColorProperty:
        return self._get_property("color")

    @property
    def blendMode(self) -> OneDProperty:
        return self._get_property("blendMode")

    @property
    def size(self) -> OneDProperty:
        return self._get_property("size")

    @property
    def opacity(self) -> OneDProperty:
        return self._get_property("opacity")

    @property
    def position(self) -> OneDProperty:
        return self._get_property("position")


class _GeometryOptionsGroup(PropertyGroup):
    """Properties for Geometry Options Group."""

    @property
    def curvature(self) -> OneDProperty:
        return self._get_property("curvature")

    @property
    def segments(self) -> OneDProperty:
        return self._get_property("segments")

    @property
    def bevelStyle(self) -> OneDProperty:
        return self._get_property("bevelStyle")

    @property
    def bevelDepth(self) -> OneDProperty:
        return self._get_property("bevelDepth")

    @property
    def holeBevelDepth(self) -> OneDProperty:
        return self._get_property("holeBevelDepth")

    @property
    def extrusionDepth(self) -> OneDProperty:
        return self._get_property("extrusionDepth")


class _MaterialOptionsGroup(PropertyGroup):
    """Properties for Material Options Group."""

    @property
    def castsShadows(self) -> OneDProperty:
        return self._get_property("castsShadows")

    @property
    def lightTransmission(self) -> OneDProperty:
        return self._get_property("lightTransmission")

    @property
    def acceptsShadows(self) -> OneDProperty:
        return self._get_property("acceptsShadows")

    @property
    def acceptsLights(self) -> OneDProperty:
        return self._get_property("acceptsLights")

    @property
    def appearsInReflections(self) -> OneDProperty:
        return self._get_property("appearsInReflections")

    @property
    def ambient(self) -> OneDProperty:
        return self._get_property("ambient")

    @property
    def diffuse(self) -> OneDProperty:
        return self._get_property("diffuse")

    @property
    def specularIntensity(self) -> OneDProperty:
        return self._get_property("specularIntensity")

    @property
    def specularShininess(self) -> OneDProperty:
        return self._get_property("specularShininess")

    @property
    def metal(self) -> OneDProperty:
        return self._get_property("metal")

    @property
    def reflectionIntensity(self) -> OneDProperty:
        return self._get_property("reflectionIntensity")

    @property
    def reflectionSharpness(self) -> OneDProperty:
        return self._get_property("reflectionSharpness")

    @property
    def reflectionRolloff(self) -> OneDProperty:
        return self._get_property("reflectionRolloff")

    @property
    def transparency(self) -> OneDProperty:
        return self._get_property("transparency")

    @property
    def transparencyRolloff(self) -> OneDProperty:
        return self._get_property("transparencyRolloff")

    @property
    def indexOfRefraction(self) -> OneDProperty:
        return self._get_property("indexOfRefraction")


class _AudioGroup(PropertyGroup):
    """Properties for Audio Group."""

    @property
    def audioLevels(self) -> TwoDProperty:
        return self._get_property("audioLevels")


class _TextProperties(PropertyGroup):
    """Properties for Text."""

    @property
    def sourceText(self) -> TextDocumentProperty:
        return self._get_property("sourceText")

    @property
    def pathOption(self) -> _TextPathOptions:
        return self._get_property("pathOption")

    @property
    def moreOption(self) -> _TextMoreOptions:
        return self._get_property("moreOption")


class _TextPathOptions(PropertyGroup):
    """Properties for Text Path Options."""

    @property
    def path(self) -> OneDProperty:
        return self._get_property("path")


class _TextMoreOptions(PropertyGroup):
    """Properties for More Text Options."""

    @property
    def anchorPointGrouping(self) -> OneDProperty:
        return self._get_property("anchorPointGrouping")

    @property
    def groupingAlignment(self) -> TwoDProperty:
        return self._get_property("groupingAlignment")

    @property
    def fillANdStroke(self) -> OneDProperty:
        return self._get_property("fillANdStroke")

    @property
    def interCharacterBlending(self) -> OneDProperty:
        return self._get_property("interCharacterBlending")
