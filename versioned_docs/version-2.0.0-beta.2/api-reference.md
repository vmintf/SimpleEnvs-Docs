---
id: api-reference
title: API Reference
sidebar_label: API Reference
sidebar_position: 4
description: Complete API reference for SimpleEnvs functions and classes
keywords: [simpleenvs, simpleenvs-python, api, reference, documentation, functions]
---

# SimpleEnvs API Reference

Complete reference for all SimpleEnvs functions and classes with **Beta.2 updates**.

## Table of Contents

- [Loading Functions](#loading-functions)
- [Simple API (System Environment)](#simple-api-system-environment)
- [Secure API (Memory-Isolated)](#secure-api-memory-isolated)
- [SecureLoaderManager](#secureloadermanager)
- [Type-Safe Getters](#type-safe-getters)
- [Utility Functions](#utility-functions)
- [Performance & Benchmarking](#performance--benchmarking)
- [Classes](#classes)
- [Exceptions](#exceptions)
- [Constants](#constants)
- [Beta.2 Changes](#beta2-changes)

---

## Loading Functions

### `load_dotenv(path=None)`

One-liner to load .env file synchronously (python-dotenv compatible).

**Parameters:**
- `path` (str, optional): Path to .env file, or None for auto-discovery

**Returns:** None

**Example:**
```python
from simpleenvs import load_dotenv
load_dotenv()  # Auto-discover .env file
load_dotenv('.env.production')  # Specific file
```

### `aload_dotenv(path=None)`

One-liner to load .env file asynchronously.

**Parameters:**
- `path` (str, optional): Path to .env file, or None for auto-discovery

**Returns:** None

**🔄 Beta.2 Changes:** Now uses `simpleenvs.load()` internally for better consistency.

**Example:**
```python
from simpleenvs import aload_dotenv
await aload_dotenv()
await aload_dotenv('.env.development')
```

### `load_dotenv_secure(path=None, strict=True)`

One-liner to load .env file with maximum security (memory-isolated).

**Parameters:**
- `path` (str, optional): Path to .env file, or None for auto-discovery
- `strict` (bool): Enable strict security validation

**Returns:** None

**Example:**
```python
from simpleenvs import load_dotenv_secure
load_dotenv_secure()  # Maximum security!
load_dotenv_secure('.env.production', strict=True)
```

### `load_dotenv_secure_async(path=None, strict=True)` 🆕

**NEW in Beta.2:** One-liner to load .env file with maximum security asynchronously.

**Parameters:**
- `path` (str, optional): Path to .env file, or None for auto-discovery
- `strict` (bool): Enable strict security validation

**Returns:** None

**Example:**
```python
from simpleenvs import load_dotenv_secure_async

# Async secure loading
await load_dotenv_secure_async()  
await load_dotenv_secure_async('.env.production', strict=True)

# FastAPI integration
@app.on_event("startup")
async def startup():
    await load_dotenv_secure_async()
```

---

## Simple API (System Environment)

Functions that sync environment variables to `os.environ`.

### `load(path=None, max_depth=2)`

Load environment variables asynchronously using SimpleEnvLoader.

**Parameters:**
- `path` (str, optional): Specific .env file path, or None for auto-discovery
- `max_depth` (int): Maximum directory depth to search for .env files

**Returns:** None

**Example:**
```python
import simpleenvs
await simpleenvs.load()
await simpleenvs.load('.env.production', max_depth=1)
```

### `load_sync(path=None, max_depth=2)`

Load environment variables synchronously using SimpleEnvLoader.

**Parameters:**
- `path` (str, optional): Specific .env file path, or None for auto-discovery
- `max_depth` (int): Maximum directory depth to search for .env files

**Returns:** None

**Example:**
```python
import simpleenvs
simpleenvs.load_sync()
```

### `get(key, default=None)`

Get environment variable from system environment.

**Parameters:**
- `key` (str): Environment variable name
- `default` (EnvValue, optional): Default value if not found

**Returns:** Optional[EnvValue]

**Note:** Uses `os.getenv()` since SimpleEnvLoader syncs to system environment.

**Example:**
```python
db_host = simpleenvs.get('DB_HOST', 'localhost')
```

### `get_int(key, default=None)`

Get environment variable as integer.

**Parameters:**
- `key` (str): Environment variable name
- `default` (int, optional): Default value if not found

**Returns:** Optional[int]

**Example:**
```python
port = simpleenvs.get_int('PORT', 8080)
```

### `get_bool(key, default=None)`

Get environment variable as boolean.

**Parameters:**
- `key` (str): Environment variable name
- `default` (bool, optional): Default value if not found

**Returns:** Optional[bool]

**Note:** Recognizes: "true", "yes", "1", "on", "enable", "enabled" as True

**Example:**
```python
debug = simpleenvs.get_bool('DEBUG', False)
```

### `get_str(key, default=None)`

Get environment variable as string.

**Parameters:**
- `key` (str): Environment variable name
- `default` (str, optional): Default value if not found

**Returns:** Optional[str]

**Example:**
```python
app_name = simpleenvs.get_str('APP_NAME', 'MyApp')
```

### `is_loaded()`

Check if simple environment is loaded.

**Returns:** bool

**Example:**
```python
if simpleenvs.is_loaded():
    print("Environment loaded successfully")
```

---

## Secure API (Memory-Isolated)

Functions that keep environment variables in memory, **NOT** in `os.environ`.

### `load_secure(path=None, strict=True, max_depth=2)`

Load environment variables using SecureEnvLoader (memory-isolated).

**Parameters:**
- `path` (str, optional): Specific .env file path, or None for auto-discovery
- `strict` (bool): Enable strict security validation
- `max_depth` (int): Maximum directory depth to search for .env files

**Returns:** None

**Example:**
```python
await simpleenvs.load_secure()
await simpleenvs.load_secure('.env.secrets', strict=True)
```

### `load_secure_async(path=None, strict=True, max_depth=2)` 🆕

**NEW in Beta.2:** Load environment variables using SecureEnvLoader asynchronously.

**Parameters:**
- `path` (str, optional): Specific .env file path, or None for auto-discovery
- `strict` (bool): Enable strict security validation
- `max_depth` (int): Maximum directory depth to search for .env files

**Returns:** None

**Example:**
```python
# Direct async secure loading
await simpleenvs.load_secure_async()
await simpleenvs.load_secure_async('.env.secrets', strict=True, max_depth=1)

# Production async pattern
async def startup():
    await simpleenvs.load_secure_async('.env.production', strict=True)
    print("🔒 Secure environment loaded")
```

### `get_secure(key, default=None)`

Get secure environment variable (memory-isolated, NOT in os.environ).

**Parameters:**
- `key` (str): Environment variable name
- `default` (EnvValue, optional): Default value if not found

**Returns:** Optional[EnvValue]

**Note:** Uses SecureLoaderManager for cross-module access

**Example:**
```python
api_key = simpleenvs.get_secure('API_KEY')
```

### `get_int_secure(key, default=None)`

Get secure environment variable as integer.

**Parameters:**
- `key` (str): Environment variable name
- `default` (int, optional): Default value if not found

**Returns:** Optional[int]

**Example:**
```python
timeout = simpleenvs.get_int_secure('TIMEOUT', 30)
```

### `get_bool_secure(key, default=None)`

Get secure environment variable as boolean.

**Parameters:**
- `key` (str): Environment variable name
- `default` (bool, optional): Default value if not found

**Returns:** Optional[bool]

**Example:**
```python
secure_mode = simpleenvs.get_bool_secure('SECURE_MODE', True)
```

### `get_str_secure(key, default=None)`

Get secure environment variable as string.

**Parameters:**
- `key` (str): Environment variable name
- `default` (str, optional): Default value if not found

**Returns:** Optional[str]

**Example:**
```python
jwt_secret = simpleenvs.get_str_secure('JWT_SECRET')
```

### `is_loaded_secure()`

Check if secure environment is loaded.

**Returns:** bool

**Example:**
```python
if simpleenvs.is_loaded_secure():
    print("Secure environment loaded")
```

### `get_security_info()`

Get security information from secure loader.

**Returns:** Optional[Dict[str, Any]]

**Example:**
```python
info = simpleenvs.get_security_info()
if info:
    print(f"Session ID: {info['session_id']}")
    print(f"Access count: {info['access_count']}")
```

---

## SecureLoaderManager

The SecureLoaderManager provides intelligent management of SecureEnvLoader instances across your application with pythonic interface.

### `get_all_secure_loaders()`

Get all SecureEnvLoader instances in memory.

**Returns:** List[SecureEnvLoader]

**Example:**
```python
loaders = simpleenvs.get_all_secure_loaders()
print(f"Found {len(loaders)} secure loaders in memory")
```

### Magic Methods Support

The manager supports pythonic access patterns:

#### Length and Boolean Operations
```python
import simpleenvs

# Check if any secure loaders exist
if simpleenvs._secure_manager:
    print("Secure environment available")

# Get count of loaders in memory
loader_count = len(simpleenvs._secure_manager)
print(f"Active loaders: {loader_count}")
```

#### Dictionary-like Access
```python
# Direct key access (uses active loader)
secret = simpleenvs._secure_manager['SECRET_KEY']

# Equivalent to:
secret = simpleenvs.get_secure('SECRET_KEY')
```

#### Iteration Support
```python
# Iterate over all loaders
for loader in simpleenvs._secure_manager:
    info = loader.get_security_info()
    print(f"Loader session: {info['session_id']}")
```

---

## Type-Safe Getters

All getter functions support automatic type conversion with validation:

### Boolean Values

**True values:** "true", "yes", "1", "on", "enable", "enabled", "active", "ok", "y", "t"  
**False values:** "false", "no", "0", "off", "disable", "disabled", "inactive", "n", "f", "null", "none", ""

### Integer Values

- Supports positive and negative integers
- Range: -2^63 to 2^63-1 (64-bit signed)
- Out-of-range values remain as strings

### String Values

- All values can be converted to strings
- UTF-8 encoding validation in strict mode

---

## Utility Functions

### `get_all_keys()`

Get all available environment variable keys from both simple and secure loaders.

**Returns:** List[str]

**Example:**
```python
keys = simpleenvs.get_all_keys()
print(f"Available variables: {keys}")
```

### `clear()`

Clear all loaded environment data and secure wipe sensitive information.

**Returns:** None

**Note:** Now includes automatic SecureLoaderManager cleanup

**Example:**
```python
simpleenvs.clear()  # Clean up all data + secure wipe
```

### `get_info()`

Get comprehensive information about loaded environments.

**Returns:** Dict[str, Any]

**Enhanced with new fields:**
- `secure_loaders_in_memory`: Count of SecureEnvLoader instances
- `manager_status`: SecureLoaderManager status

**Example:**
```python
info = simpleenvs.get_info()
print(f"Version: {info['version']}")
print(f"Simple loaded: {info['simple_loaded']}")
print(f"Secure loaded: {info['secure_loaded']}")
print(f"Secure loaders in memory: {info['secure_loaders_in_memory']}")
```

---

## Performance & Benchmarking

SimpleEnvs includes comprehensive benchmarking tools:

```python
# Run built-in benchmark
python -m simpleenvs.benchmark

# Quick benchmark (3 rounds)
python -m simpleenvs.benchmark --quick

# Include Secure API benchmarking
python -m simpleenvs.benchmark --secure

# Test specific variable count
python -m simpleenvs.benchmark --size 1000
```

### Performance Monitoring

Monitor your application's .env loading performance:

```python
import time
import simpleenvs

# Measure loading time
start = time.perf_counter()
await simpleenvs.load_secure_async('large_config.env')  # 🆕 Beta.2
load_time = (time.perf_counter() - start) * 1000

print(f"Async secure loading took: {load_time:.2f}ms")
```

---

## Classes

### `SimpleEnvLoader`

Simple, fast .env loader that syncs to system environment variables.

#### Methods

##### `__init__()`

Initialize simple loader.

##### `async load(path=None, max_depth=2)`

Load environment variables from .env file and sync to system.

##### `load_sync(path=None, max_depth=2)`

Load environment variables synchronously and sync to system.

##### `get(key)`, `get_int(key, default=None)`, `get_bool(key, default=None)`, `get_str(key, default=None)`

Type-safe getters for environment variables.

##### `is_loaded()`, `clear()`, `keys()`, `get_all()`

Status and utility methods.

**Example:**
```python
from simpleenvs import SimpleEnvLoader

loader = SimpleEnvLoader()
await loader.load('.env')
value = loader.get('KEY')
```

### `SecureEnvLoader`

Ultra-secure environment variable loader with defense-in-depth and enhanced performance.

#### Enhanced Features

- **Batch Security Validation**: Optimized content scanning
- **Intelligent File Reading**: Size-based sync/async strategy
- **Memory Optimization**: Reduced parsing overhead
- **Session Tracking**: Detailed access logging

#### Methods

##### `__init__(session_id=None)`

Initialize secure loader with optional session ID.

##### `async load_secure(options=LoadOptions())`

Securely load environment variables with enhanced performance.

**New optimizations:**
- Files < 1MB: Synchronous reading (faster)
- Files > 1MB: Asynchronous reading (non-blocking)
- Batch security validation for better performance

##### `get_secure(key)`, `get_int_secure(key, default=None)`, etc.

Enhanced type-safe getters with performance monitoring.

##### `get_security_info()`

Get comprehensive security and performance information.

##### `verify_file_integrity(file_path)`, `secure_wipe()`

Security methods for integrity checking and data cleanup.

**Example:**
```python
from simpleenvs import SecureEnvLoader

loader = SecureEnvLoader(session_id="prod-001")
await loader.load_secure()
secret = loader.get_secure('SECRET_KEY')

# Performance monitoring
info = loader.get_security_info()
print(f"Access count: {info['access_count']}")
```

### `SecureLoaderManager`

Intelligent manager for SecureEnvLoader instances with pythonic interface.

#### Key Features

- **Automatic Discovery**: Finds loaders across modules
- **Priority Resolution**: Global → Memory → None
- **Magic Methods**: Pythonic `len()`, `bool()`, iteration
- **Memory Safety**: Weak references prevent leaks

#### Methods

##### `get_active_loader()`

Get the currently active SecureEnvLoader instance.

##### `get_all_loaders()`

Get all SecureEnvLoader instances in memory.

##### Magic Methods

- `__len__()`: Number of loaders in memory
- `__bool__()`: True if active loader exists
- `__iter__()`: Iterate over all loaders
- `__getitem__(key)`: Direct key access
- `__contains__(loader)`: Check if loader in memory

**Example:**
```python
from simpleenvs import SecureLoaderManager

manager = SecureLoaderManager()

if manager:  # __bool__
    print(f"Found {len(manager)} loaders")  # __len__
    
    secret = manager['SECRET_KEY']  # __getitem__
    
    for loader in manager:  # __iter__
        print(f"Session: {loader.get_security_info()['session_id']}")
```

### `LoadOptions`

Configuration options for secure loading with enhanced validation.

#### Attributes

- `path` (str, optional): File path
- `max_depth` (int): Maximum search depth  
- `strict_validation` (bool): Enable strict validation

**Example:**
```python
from simpleenvs.secure import LoadOptions

options = LoadOptions(
    path='.env.production',
    max_depth=1,
    strict_validation=True
)
await loader.load_secure(options)
```

---

## Exceptions

All exceptions with enhanced error reporting:

### Core Exceptions

- `SimpleEnvsError`: Base exception for all SimpleEnvs errors
- `EnvSecurityError`: Base security exception
- `PathTraversalError`: Path traversal attack detected
- `FileSizeError`: File size exceeds security limits
- `InvalidInputError`: Input validation failed
- `AccessDeniedError`: Access to internal methods denied

### Parsing & Loading Exceptions

- `FileParsingError`: Error during file parsing (enhanced with line numbers)
- `EnvNotLoadedError`: Environment variables not loaded yet
- `KeyNotFoundError`: Environment variable key not found
- `TypeConversionError`: Type conversion failed

### Security & System Exceptions

- `ConfigurationError`: Configuration or setup error
- `IntegrityError`: File integrity check failed
- `SessionError`: Session-related security error
- `MemorySecurityError`: Memory security violation

**Enhanced Error Handling:**
```python
try:
    await simpleenvs.load_dotenv_secure_async('config.env')  # 🆕 Beta.2
except simpleenvs.FileSizeError as e:
    print(f"File too large: {e.size} bytes (max: {e.max_size})")
except simpleenvs.PathTraversalError as e:
    print(f"Security violation: {e.attempted_path}")
except simpleenvs.SimpleEnvsError as e:
    print(f"General error: {e}")
```

---

## Constants

### Version Information

- `__version__`: Library version string (currently 2.0.0-beta.2)
- `VERSION`: Same as __version__
- `API_VERSION`: API version

### Security Limits

- `MAX_FILE_SIZE`: 10MB maximum file size
- `MAX_KEY_LENGTH`: 128 characters maximum key length
- `MAX_VALUE_LENGTH`: 1024 characters maximum value length
- `MAX_SCAN_DEPTH`: 3 levels maximum search depth
- `MAX_ENTRIES_PER_DIRECTORY`: 10,000 entries per directory
- `MAX_ACCESS_LOG_ENTRIES`: 100 access log entries (memory management)

### Performance Constants

- `READ_BUFFER_SIZE`: 8KB buffer for file reading
- `HASH_BUFFER_SIZE`: 4KB buffer for integrity hashing
- `CACHE_TTL`: 300 seconds cache timeout
- `FILE_READ_TIMEOUT`: 30 seconds file read timeout

### Environment Types

- `get_environment_type()`: Returns current environment type
- Supported: "development", "production", "testing", "staging"

**Example:**
```python
import simpleenvs
print(f"Version: {simpleenvs.__version__}")
print(f"Environment: {simpleenvs.get_environment_type()}")
print(f"Max file size: {simpleenvs.MAX_FILE_SIZE}")
```

---

## Beta.2 Changes

### 🆕 New Functions

```python
# New async secure functions
await simpleenvs.load_secure_async(path=None, strict=True, max_depth=2)
await simpleenvs.load_dotenv_secure_async(path=None, strict=True)
```

### 🔄 Enhanced Functions

```python
# Enhanced implementation
await simpleenvs.aload_dotenv(path=None)  # Now uses load() internally
```

### 📦 Updated __all__ Exports

**Beta.2 adds the following exports:**

```python
__all__ = [
    # ... existing exports ...
    
    # 🆕 New Beta.2 exports
    "load_secure_async",           # Async secure loading (internal API)
    "load_dotenv_secure_async",    # Async secure one-liner
    
    # 🔄 Enhanced exports (implementation improved)
    "aload_dotenv",                # Better internal implementation
]
```

### 🚀 Migration from Beta.1

**Fully backward compatible** - no breaking changes!

```python
# ✅ All Beta.1 code works unchanged
await simpleenvs.load_secure()
await simpleenvs.aload_dotenv()

# 🆕 New Beta.2 features
await simpleenvs.load_secure_async()        # New dedicated async API
await simpleenvs.load_dotenv_secure_async() # New async one-liner
```

### 🎯 Usage Patterns

#### Before (Beta.1)
```python
# Sync secure loading only
simpleenvs.load_dotenv_secure()

# Async simple loading
await simpleenvs.aload_dotenv()
```

#### After (Beta.2) 
```python
# Sync secure loading (unchanged)
simpleenvs.load_dotenv_secure()

# 🆕 Async secure loading (new!)
await simpleenvs.load_dotenv_secure_async()

# Enhanced async simple loading
await simpleenvs.aload_dotenv()  # Better implementation
```

### 🔧 Internal Improvements

1. **Better Async Consistency**: `aload_dotenv()` now uses `load()` internally
2. **Dedicated Async Secure API**: Separate async functions for secure loading
3. **Improved Error Handling**: Better async error propagation
4. **Enhanced Performance**: Optimized async loading patterns

---

## Best Practices (Updated for Beta.2)

### 1. Use Appropriate Async Functions

```python
# ✅ Recommended: Use dedicated async functions
await simpleenvs.aload_dotenv()                # For simple loading
await simpleenvs.load_dotenv_secure_async()    # For secure loading

# ❌ Avoid: Mixing sync and async inconsistently
simpleenvs.load_dotenv_secure()              # Sync
await simpleenvs.aload_dotenv()               # Async - inconsistent!
```

### 2. Modern Web App Pattern

```python
# ✅ Modern FastAPI/async pattern
@app.on_event("startup")
async def startup():
    # Load public config
    await simpleenvs.aload_dotenv('.env.public')
    
    # Load secrets securely (new async API!)
    await simpleenvs.load_dotenv_secure_async('.env.secrets')
```

### 3. Environment-Specific Async Loading

```python
# ✅ Environment-aware async loading
import os

env = os.getenv('ENVIRONMENT', 'development')

if env == 'production':
    await simpleenvs.load_dotenv_secure_async(f'.env.{env}', strict=True)
else:
    await simpleenvs.aload_dotenv(f'.env.{env}')
```

---

## Type Definitions

```python
from typing import Union, Dict, List, Optional

EnvValue = Union[str, int, bool]
EnvMap = Dict[str, EnvValue]

# New manager type
SecureLoaderManager = simpleenvs.manager.SecureLoaderManager
```

---

## Need Help?

- 🐛 [Report issues](https://github.com/vmintf/SimpleEnvs-Python/issues)
- 💬 [Join discussions](https://github.com/vmintf/SimpleEnvs-Python/discussions)
- 📧 [Contact support](mailto:vmintf@gmail.com)
- 📚 [Full documentation](https://github.com/vmintf/SimpleEnvs-Python)
- 🏃‍♂️ [Performance benchmarks](https://github.com/vmintf/SimpleEnvs-Python/tree/main/src/simpleenvs/benchmark.py)

---

**What's Next?** 
- 🔒 Learn about [Security Features](security.md) for enterprise-grade protection
- ⚡ Explore [Performance Guide](performance.md) for optimization tips
- 🏗️ Check out [Best Practices](best-practices.md) for production patterns
- 🆕 Read [Migration Guide](migration.md) for Beta.1 to Beta.2 migration

*Updated for SimpleEnvs v2.0.0-beta.2 with enhanced async support* 🚀⚡